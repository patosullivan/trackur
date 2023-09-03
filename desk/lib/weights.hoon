/-  *weights
|%
++  dejs
  =,  dejs:format
  |%
  ++  weight-meta
    ^-  $-(json ^weight-meta)
    %-  ot
    :~  date/ni
        weight/ni
    ==

  ++  dejs-action
  |=  jon=json
  ^-  action
  %.  jon
  %-  of
  :~  [%add (ot ~[id+so weight-meta+weight-meta])]
      [%edit (ot ~[id+so weight-meta+weight-meta])]
      [%delete (ot ~[id+so])]
  ==
--
++  enjs-update
  =,  enjs:format
  |=  upd=update
  ^-  json
  |^
  ?+    -.q.upd  (logged upd)
      %weights
    %-  pairs
    :~  ['time' (numb p.upd)]
        ['weights' a+(turn list.q.upd weight)]
    ==
  ::
      %logs
    %-  pairs
    :~  ['time' (numb p.upd)]
        ['logs' a+(turn list.q.upd logged)]
    ==
  ==
  ++  weight
    |=  fst=^weight
    ^-  json
    %-  pairs
    :~  ['id' s+id.fst]
        :-  'weight-meta'
        %-  pairs
        :~  ['date' (numb date.weight-meta.fst)]
            ['weight' (numb weight.weight-meta.fst)]
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
              :-  'weight-meta'
              %-  pairs
              :~  ['date' (numb date.weight-meta.q.lgd)]
                  ['weight' (numb weight.weight-meta.q.lgd)]
              ==
      ==  ==
        %edit
      %-  pairs
      :~  ['time' (numb p.lgd)]
          :-  'edit'
          %-  pairs
          :~  ['id' s+id.q.lgd]
              :-  'weight-meta'
              %-  pairs
              :~  ['date' (numb date.weight-meta.q.lgd)]
                  ['weight' (numb weight.weight-meta.q.lgd)]
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
