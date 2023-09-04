/-  *weights
/+  *lazytrig
|%
++  dejs
  =,  dejs:format
  |%
  ++  weight-meta
    ^-  $-(json ^weight-meta)
    %-  ot
    :~  date/ni
        weight/ne
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
            ['weight' (numb-rd weight.weight-meta.fst)]
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
                  ['weight' (numb-rd weight.weight-meta.q.lgd)]
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
                  ['weight' (numb-rd weight.weight-meta.q.lgd)]
              ==
      ==  ==
        %delete
      %-  pairs
      :~  ['time' (numb p.lgd)]
          :-  'delete'
          (frond 'id' s+id.q.lgd)
      ==
    ==
    ++  u-to-tape
      |=  a=@u
      ?:  =(0 a)  "0"
      %-  flop
      |-  ^-  ^tape
      ?:(=(0 a) ~ [(add '0' (mod a 10)) $(a (div a 10))])
    ++  numb-rd
      |=  a=@rd
      ^-  json
      :-  %n
      (rd-to-cord a)
    ++  rd-to-cord
      |=  a=@rd
      ^-  @ta
      =/  integer-part  (u-to-cord (floor a))
      =/  decimal-part  (floor-remainder a)
      ?:  (is-float-garbage decimal-part)  integer-part
      =/  full-number  (snoc (trip integer-part) '.')
      =/  new-num  (mul:rd decimal-part .~10)
      =/  depth=@ud  1
      |-
      =/  new-num-decimal  (floor-remainder new-num)
      ?:  ?|((is-float-garbage new-num-decimal) (gth depth 12))
        (crip (snoc full-number (u-to-cord (round new-num))))
      %=  $
        full-number  (snoc full-number (u-to-cord (floor new-num)))
        new-num  (mul:rd new-num-decimal .~10)
        depth  +(depth)
      ==
    ++  is-float-garbage
      |=  a=@rd
      =/  tol  .~0.0000000000005
      (lte:rd (absolute (sub:rd .~1 a)) tol)
    ++  u-to-cord
      |=  a=@u
      (crip (u-to-tape a))
  --
--
