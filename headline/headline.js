'use strict';

/**
 * for headline story
 */

(function () {
    var elmHeadline = document.querySelector('.headline-story');
    var elmControl = elmHeadline && elmHeadline.getElementsByClassName('control')[0];
    var stories = elmHeadline.getElementsByClassName('story');
    var bars = elmHeadline.getElementsByClassName('bar');
    var btnPrev = elmControl && elmControl.getElementsByClassName('btn-prev')[0];
    var tutorial = elmHeadline.getElementsByClassName('ripple');
    var TUTORIALKEY = 'headline-tutorial';
    var TUTORIAL_DURATION = 6000;
    var activeIndex = 0;
    var storyTotal;
    var activeStory;
    var lastStory;
    var ANIM_DURATION = 5000;
    var isAutoplay;
    var autoplayTimer;
    var linkViewData = [];
    var isPaused = false;
    var inViewport = false;

    function bindClickControl() {
        if (!elmControl) {
            return;
        }
        elmControl.addEventListener('click', function (e) {
            pauseAutoplay();
            step(e.target === btnPrev, true);
        });
    }

    function handleAnimate(bar) {
        var classname = bar.classList;
        classname.remove('bar-on');
        classname.add('bar-anim');
    }

    function handleComplete(bar) {
        var classname = bar.classList;
        classname.remove('bar-anim');
        classname.add('bar-on');
    }

    function handleReset(bar) {
        bar.classList.remove('bar-anim', 'bar-on');
    }

    function startAutoplay() {
        if (autoplayTimer) {
            return;
        }
        autoplayTimer = window.setInterval(step, ANIM_DURATION);
    }

    function pauseAutoplay() {
        window.clearInterval(autoplayTimer);
        autoplayTimer = 0;
        isPaused = true;
    }

    function setupObserver() {
        if (!'IntersectionObserver' in window ||
            !'IntersectionObserverEntry' in window ||
            !'intersectionRatio' in window.IntersectionObserverEntry.prototype) {
            return;
        }

        var options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.9
        };
        var intersectionCallback = function (entries, observer) {
            if (entries[0].intersectionRatio > 0.9) {
                inViewport = true;
                if (isPaused) {
                    step();
                }
            } else {
                inViewport = false;
                pauseAutoplay();
            }
        };
        var observer = new IntersectionObserver(intersectionCallback, options);
        observer.observe(elmHeadline);
    }

    function setupPageEvents() {
        window.wafer.on('pageVisibilityChange', data => {
            if (data.isActive) {
                if (isPaused && inViewport) {
                    step();
                };
            } else {
                pauseAutoplay();
            }
        });
    }

    function setupLinkView() {
        for (var k = 0; k < stories.length; k++) {
            try {
                var itemLinkView = JSON.parse(stories[k].dataset.i13n);
                linkViewData.push(itemLinkView);
            } catch (e) {
                linkViewData.push({});
            }
        }
    }

    function beaconLinkView(activeIndex) {
        var rapidInstance = window && window.rapidInstance;
        if (!rapidInstance) {
            return;
        }
        rapidInstance.beaconLinkViews && rapidInstance.beaconLinkViews([linkViewData[activeIndex]]);
    }

    function setupTutorial() {
        var tutorialSeen;
        try {
            tutorialSeen = window.localStorage.getItem(TUTORIALKEY);
        } catch (err) { };
        // TODO: remember to clean up storage when tutoral is not needed
        if (tutorial.length && !tutorialSeen) {
            tutorial = tutorial[0];
            tutorial.classList.remove('Op(0)');
            window.setTimeout(function () {
                tutorial.classList.add('Op(0)');
                try {
                    window.localStorage.setItem(TUTORIALKEY, new Date().getTime());
                } catch (err) { };
            }, TUTORIAL_DURATION);
        }
    }

    function step(prev, shouldFireBeacon) {
        if (prev) {
            activeIndex = activeIndex - 1;
            if (activeIndex < 0) {
                activeIndex = storyTotal - 1;
            }
        } else {
            activeIndex = (activeIndex + 1) % storyTotal;
        }

        if (shouldFireBeacon) {
            beaconLinkView(activeIndex);
        }

        window.requestAnimationFrame(function () {
            if (lastStory && lastStory !== stories[activeIndex]) {
                lastStory.classList.replace('Z(0)', 'V(h)');
            }
            var currentBar = bars[activeIndex];
            activeStory.classList.replace('active', 'Z(0)');
            lastStory = activeStory;
            if (stories[activeIndex].classList.contains('Z(0)')) {
                stories[activeIndex].classList.replace('Z(0)', 'active');
            } else {
                stories[activeIndex].classList.replace('V(h)', 'active');
            }
            activeStory = stories[activeIndex];

            if (prev) {
                if (activeIndex === storyTotal - 1) {
                    // set all other bars to 100% without transition
                    for (var i = 0; i < storyTotal; i++) {
                        handleComplete(bars[i]);
                    };
                } else {
                    // set next bar to 0 without transition
                    handleReset(bars[activeIndex + 1]);
                }
                // animate current bar
                handleAnimate(currentBar);
            } else {
                // reset all bar to 0 without transition
                if (!activeIndex) {
                    for (var j = 0; j < storyTotal; j++) {
                        handleReset(bars[j]);
                    };
                } else {
                    // set previous bar to 100% without transition
                    handleComplete(bars[activeIndex - 1]);
                }
                // animate current bar
                handleAnimate(currentBar);
            }
            if (isAutoplay) {
                startAutoplay();
            }
        });
    }

    window.wafer && window.wafer.ready(function () {
        var initState = window.wafer.base.state['headline-story'];
        storyTotal = initState && initState.total;
        isAutoplay = initState && initState.autoplay;
        if (!bars || !btnPrev || !stories || typeof activeIndex === 'undefined' || typeof storyTotal === 'undefined') {
            return;
        }
        activeStory = stories[activeIndex];

        if (isAutoplay) {
            setupObserver();
            setupPageEvents();
            startAutoplay();
        }
        setupLinkView();
        bindClickControl();
        setupTutorial();
    });
})();
