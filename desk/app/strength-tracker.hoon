/-  *strength-tracker
/+  default-agent, dbug, strength-training
|%
+$  versioned-state
  $%  state-0
      state-1
  ==
+$  state-0
  $:  %0
      workouts=(list workout)
  ==
+$  state-1
  $:  %1
      workouts=(list workout)
      common-exercises=(list common-exercise)
  ==
+$  card  card:agent:gall
--
%-  agent:dbug
=|  state-1
=*  state  -
^-  agent:gall
|_  =bowl:gall
+*  this     .
    default  ~(. (default-agent this %.n) bowl)
++  on-init
  ^-  (quip card _this)
  `this(common-exercises ~[[id=1 name='Squat'] [id=2 name='Bench Press'] [id=3 name='Deadlift']])
++  on-save
  ^-  vase
  !>(state)
++  on-load
  |=  old-state=vase
  ^-  (quip card _this)
  =/  old  !<(versioned-state old-state)
  ?-  -.old
    %0  `this(state [%1 workouts.old ~])
    %1  `this(state old)
  ==
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?+    mark  (on-poke:default mark vase)
      %strength-tracker-action
    =/  action  !<(action vase)
    ?-    -.action
        %add-workout
      :_  this(workouts [workout.action workouts])
      ~[(fact:agentio %strength-tracker-update !>([%add-workout workout.action]) ~[/updates])]
        %delete-workout
      =/  new-workouts  (skip workouts |=(w=workout =(id.w id.action)))
      :_  this(workouts new-workouts)
      ~[(fact:agentio %strength-tracker-update !>([%delete-workout id.action]) ~[/updates])]
        %add-common-exercise
      :_  this(common-exercises [common-exercise.action common-exercises])
      ~[(fact:agentio %strength-tracker-update !>([%add-common-exercise common-exercise.action]) ~[/updates])]
        %delete-common-exercise
      =/  new-common-exercises  (skip common-exercises |=(e=common-exercise =(id.e id.action)))
      :_  this(common-exercises new-common-exercises)
      ~[(fact:agentio %strength-tracker-update !>([%delete-common-exercise id.action]) ~[/updates])]
    ==
      %json
    =/  json-data  !<(json:strength-training vase)
    =/  action  (action:dejs:strength-training json-data)
    $(mark %strength-tracker-action, vase !>(action))
  ==
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?+    path  (on-watch:default path)
      [%updates ~]
    :_  this
    :~  [%give %fact ~ %strength-tracker-update !>([%initial-state workouts common-exercises])]
    ==
  ==
++  on-arvo   on-arvo:default
++  on-leave  on-leave:default
++  on-peek
  |=  =path
  ^-  (unit (unit cage))
  ?+    path  (on-peek:default path)
      [%x %workouts ~]
    ``strength-tracker-update+!>([%initial-state workouts common-exercises])
      [%x %workout @ ~]
    =/  id  (slav %ud i.t.t.path)
    =/  workout  (find ~[id] workouts)
    ?~  workout  [~ ~]
    ``strength-tracker-workout+!>(u.workout)
      [%x %common-exercises ~]
    ``strength-tracker-common-exercise+!>(common-exercises)
  ==
++  on-agent  on-agent:default
++  on-fail   on-fail:default
--
