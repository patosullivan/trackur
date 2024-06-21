|%
+$  workout
  $:  id=@ud
      date=@da
      exercises=(list performed-exercise)
  ==
+$  performed-exercise
  $:  name=@t
      sets=(list set)
  ==
+$  set
  $:  weight=@ud
      reps=@ud
  ==
+$  common-exercise
  $:  id=@ud
      name=@t
  ==
+$  action
  $%  [%add-workout =workout]
      [%delete-workout id=@ud]
      [%add-common-exercise =common-exercise]
      [%delete-common-exercise id=@ud]
  ==
+$  update
  $%  [%add-workout =workout]
      [%delete-workout id=@ud]
      [%add-common-exercise =common-exercise]
      [%delete-common-exercise id=@ud]
      [%initial-state workouts=(list workout) common-exercises=(list common-exercise)]
  ==
--
