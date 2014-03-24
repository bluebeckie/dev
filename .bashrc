
#=== start of automatically maintained lines (do not delete)===
# .bashrc, sourced by interactive non-login shells (also called by .bash_profile)

#export CVSROOT=vault.yahoo.com:/CVSROOT
#export CVS_RSH=yssh

#export PATH=${PATH}:/home/y/bin:/usr/local/bin/
#export PATH=/home/y/bin:${PATH}
export PATH=$PATH:/home/beckie/tools/node_modules/.bin
export SRCZIP="svn"
export SVNROOT=svn+ssh://svn.corp.yahoo.com
export SVN_EDITOR=/usr/bin/vim
export SVN_SSH='/usr/local/bin/yssh -q'
export LEGO_SRC_ROOT=~/lego

#export PAGER=less
export BLOCKSIZE=K
#export LC_CTYPE=it_CH.ISO_8859-1
#export LC_CTYPE=zh_TW.Big5
#export LC_ALL=
#export LANG=zh_TW.Big5
#export YINST_DIST=dist.corp.yahoo.com
#export ROOT=/home/y
export HISTFILE=~/.bash_history
export RSYNC_RSH=ssh
export IGNOREEOF=10

export PROMPT_COMMAND='echo -ne "\033]0;${USER}@${HOSTNAME%%.*}\007"'

# git auto-complete
if [ -f ~/.git-completion.bash ]; then
    source ~/.git-completion.bash
fi

if [ "$PS1" != "" ]
then
	PS1="\h \t \w \$ "
	  setenv ()  { export $1="$2"; }
	unsetenv ()  { unset $*; }
fi
#===   end of automatically maintained lines (do not delete)===
# per-user custom comands go here...

#export PS1="\[\e[33m\]\u\[\e[0m\]@\[\e[36m\]\h\[\e[0m\]:[\[\e[32m\]\w\[\e[0m\]]>\[\033[0m\] "

#show git branch
#export PS1='$(__git_ps1 "(%s)") > '

if [ $YROOT_NAME ]
then
#export PS1="\[\033[1;37m\][\u@\h:{$YROOT_NAME}:\w]\$?>\[\033[0m\]"  
export PS1="\[\e[33m\]\u\[\e[0m\]@\[\e[36m\]\h:{$YROOT_NAME}\[\e[0m\]:[\[\e[32m\]\w\[\e[0m\]]\$?>\[\033[0m\] "
else
export PS1="\[\e[33m\]\u\[\e[0m\]@\[\e[36m\]\h\[\e[0m\]:[\[\e[32m\]\w\[\e[0m\]]>\[\033[0m\] "
fi


# set colourful man pages
export LESS_TERMCAP_mb=$'\E[01;31m'
export LESS_TERMCAP_md=$'\E[01;31m'
export LESS_TERMCAP_me=$'\E[0m'
export LESS_TERMCAP_se=$'\E[0m'
export LESS_TERMCAP_so=$'\E[01;44;33m'
export LESS_TERMCAP_ue=$'\E[0m'
export LESS_TERMCAP_us=$'\E[01;32m'

#change folder name
export LSCOLORS=Gxfxcxdxbxegedabagacad

# set screen name
#ScreenName="\[\033k\H:\w\033\134\]"

export DISPLAY=:0

# set alias
alias rm='rm -i'
alias mv='mv -i'
#alias cp='cp -i'
alias ls='ls -G'
alias scp='/usr/bin/scp -C'
alias screen='TERM=vt220 screen'

alias ll='ls -lha'
alias ssh='yssh'

alias tailerr="tail -f /home/y/logs/yapache/error"
alias tailyts="tail -f /home/y/logs/yts/mon.log"

alias goroot="cd /home/y/share/frontend/media/"
alias gogsp="cd ~/lego/projects/content/"
alias gogsm="cd ~/lego/modules/content/"

alias rl="run_load_everything -u"
alias rle="run_load_everything"

alias buildlocal="yinst_create -t link && yinst i *.tgz && yinst restart yapache"
alias tailyts="tail -f /home/y/logs/yts/mon.log"


#openhouse
alias gotdgq="ssh stairshiers.corp.gq1.yahoo.com"
alias golegogq="ssh restwest.corp.gq1.yahoo.com"

#env
alias go1p="ssh fe4.qa1p.global.media.pool.sp2.yahoo.com"
alias goperf24="ssh fe1.perf24.global.media.gq1.yahoo.com"

alias jslint="yjslint.sh"

#alias cvs_status='cvs status 2>&1 | egrep "(^\? |Status: )" | grep -v Up-to-date'
#alias scclover="cd ~/lego/modules/socialchrome/tests/ && sudo phpunit --coverage-html /home/y/share/htdocs/media/modules/socialchrome/clover/"
#alias scyala="cd ~/lego/modules/socialchrome/ && js_l10n_gen -n socialchrome-strings -y3 -v"
#alias goroot="cd ~/news-us/news-dev/news/applications/"
#alias push_assets_common='cd ~/news-us/news-dev/news/applications/common && version_manifest -n common -m -v -o var/ycb/manifests/common_assets.xml -t project -p news -r http://l.yimg.com/us.js.yimg.com/lib -w temp/ && push_assets -n common -v -t project -p news -w temp/'
#alias flush_ycb='sudo /home/y/bin/ycbDbAdmin -c FLUSH -i /home/y/conf/ycb/ycb.conf -o /home/y/var/ycb/cache/'
#alias flush_repo='sudo /home/y/bin/us_news_maple_repo_load all'

if [ -f  ~/.ssh-agent.${HOSTNAME} ]
then
   source ~/.ssh-agent.${HOSTNAME}
fi

#rtsvs_test DIR
# --dimensions=../config/dimensions.json --driver=selenium --browser=firefox  --context=environment:preprod --debugLevel=debug --report=true --replaceParamJSON="{\"env\":\"qa1p\"}"

