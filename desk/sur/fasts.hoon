|%
+$  id  cord
::
+$  fasts  ((mop id fast-meta) gth)
::
+$  log  ((mop @ action) lth)
::
+$  fast  [=id =fast-meta]
::
+$  fast-meta
  $:  start=@u
      end=(unit @u)
      expectedduration=@u
      actualduration=(unit @u)
  ==
::
+$  action
  $%  [%add =id =fast-meta]
      [%edit =id =fast-meta]
      [%delete =id]
  ==
::
+$  logged  (pair @ action)
::
+$  update
  %+  pair  @
  $%  action
      [%fasts list=(list [id fast-meta])]
      [%logs list=(list logged)]
  ==
::
--
