/-  *fasts
|%
++  dejs
  =,  dejs:format
  |%
  ++  fast-meta
    ^-  $-(json ^fast-meta)
    %-  ot
    :~  start/ni
        end/(mu ni)
        expectedduration/ni
        actualduration/(mu ni)
    ==

  ++  dejs-action
  |=  jon=json
  ^-  action
  %.  jon
  %-  of
  :~  [%add (ot ~[id+so fast-meta+fast-meta])]
      [%edit (ot ~[id+so fast-meta+fast-meta])]
      [%delete (ot ~[id+so])]
  ==
--
++  enjs-update
  =,  enjs:format
  |=  upd=update
  ^-  json
  |^
  ?+    -.q.upd  (logged upd)
      %fasts
    %-  pairs
    :~  ['time' (numb p.upd)]
        ['fasts' a+(turn list.q.upd fast)]
    ==
  ::
      %logs
    %-  pairs
    :~  ['time' (numb p.upd)]
        ['logs' a+(turn list.q.upd logged)]
    ==
  ==
  ++  fast
    |=  fst=^fast
    ^-  json
    %-  pairs
    :~  ['id' s+id.fst]
        :-  'fast-meta'
        %-  pairs
        :~  ['start' (numb start.fast-meta.fst)]
            end/?~(end.fast-meta.fst ~ (numb u.end.fast-meta.fst))
            ['expectedduration' (numb expectedduration.fast-meta.fst)]
            actualduration/?~(actualduration.fast-meta.fst ~ (numb u.actualduration.fast-meta.fst))
        ==
    ==
  ++  logged
    |=  lgd=^logged
    ^-  json
    ?-    -.q.lgd
        %add
      %-  pairs
      :~  ['time' (numb p.lgd)]
          :-  'add'
          %-  pairs
          :~  ['id' s+id.q.lgd]
              :-  'fast-meta'
              %-  pairs
              :~  ['start' (numb start.fast-meta.q.lgd)]
                  end/?~(end.fast-meta.q.lgd ~ (numb u.end.fast-meta.q.lgd))
                  ['expectedduration' (numb expectedduration.fast-meta.q.lgd)]
                  actualduration/?~(actualduration.fast-meta.q.lgd ~ (numb u.actualduration.fast-meta.q.lgd))
              ==
      ==  ==
        %edit
      %-  pairs
      :~  ['time' (numb p.lgd)]
          :-  'edit'
          %-  pairs
          :~  ['id' s+id.q.lgd]
              :-  'fast-meta'
              %-  pairs
              :~  ['start' (numb start.fast-meta.q.lgd)]
                  end/?~(end.fast-meta.q.lgd ~ (numb u.end.fast-meta.q.lgd))
                  ['expectedduration' (numb expectedduration.fast-meta.q.lgd)]
                  actualduration/?~(actualduration.fast-meta.q.lgd ~ (numb u.actualduration.fast-meta.q.lgd))
              ==
      ==  ==
        %delete
      %-  pairs
      :~  ['time' (numb p.lgd)]
          :-  'delete'
          (frond 'id' s+id.q.lgd)
      ==
    ==
  --
--
