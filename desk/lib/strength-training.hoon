/-  *strength-tracker
/+  json
|%
++  enjs
  =,  enjs:format
  |%
  ++  workout
    |=  w=^workout
    %-  pairs
    :~  ['id' (numb id.w)]
        ['date' (time date.w)]
        ['exercises' a+(turn exercises.w performed-exercise)]
    ==
  ++  performed-exercise
    |=  e=^performed-exercise
    %-  pairs
    :~  ['name' s+name.e]
        ['sets' a+(turn sets.e set)]
    ==
  ++  set
    |=  s=^set
    %-  pairs
    :~  ['weight' (numb weight.s)]
        ['reps' (numb reps.s)]
    ==
  ++  common-exercise
    |=  e=^common-exercise
    %-  pairs
    :~  ['id' (numb id.e)]
        ['name' s+name.e]
    ==
  ++  action
    |=  a=^action
    %-  pairs
    ?-  -.a
      %add-workout             ['add-workout' (workout workout.a)]
      %delete-workout          ['delete-workout' (numb id.a)]
      %add-common-exercise     ['add-common-exercise' (common-exercise common-exercise.a)]
      %delete-common-exercise  ['delete-common-exercise' (numb id.a)]
    ==
  ++  update
    |=  u=^update
    %-  pairs
    ?-  -.u
      %add-workout             ['add-workout' (workout workout.u)]
      %delete-workout          ['delete-workout' (numb id.u)]
      %add-common-exercise     ['add-common-exercise' (common-exercise common-exercise.u)]
      %delete-common-exercise  ['delete-common-exercise' (numb id.u)]
      %initial-state           ['initial-state' (pairs ~[['workouts' a+(turn workouts.u workout)] ['common-exercises' a+(turn common-exercises.u common-exercise)]])]
    ==
  --
++  dejs
  =,  dejs:format
  |%
  ++  workout
    %-  ot
    :~  [%id ne]
        [%date di]
        [%exercises (ar performed-exercise)]
    ==
  ++  performed-exercise
    %-  ot
    :~  [%name so]
        [%sets (ar set)]
    ==
  ++  set
    %-  ot
    :~  [%weight ne]
        [%reps ne]
    ==
  ++  common-exercise
    %-  ot
    :~  [%id ne]
        [%name so]
    ==
  ++  action
    %-  of
    :~  [%add-workout workout]
        [%delete-workout (ot ~[[%id ne]])]
        [%add-common-exercise common-exercise]
        [%delete-common-exercise (ot ~[[%id ne]])]
    ==
  --
--
