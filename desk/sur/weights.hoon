|%
+$  id  cord
::
+$  weights  ((mop id weight-meta) gth)
::
+$  log  ((mop @ action) lth)
::
+$  weight  [=id =weight-meta]
::
+$  weight-meta
  $:  date=@u
      weight=@rd
  ==
::
+$  action
  $%  [%add =id =weight-meta]
      [%edit =id =weight-meta]
      [%delete =id]
  ==
::
+$  logged  (pair @ action)
::
+$  update
  %+  pair  @
  $%  action
      [%weights list=(list [id weight-meta])]
      [%logs list=(list logged)]
  ==
::
--
