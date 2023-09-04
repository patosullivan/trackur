::  Transcendental functions library for Hoon, compatible with @rd
=/  tau       .~6.28318530717
=/  pi        .~3.1415926535897932
=/  half-pi   (div:rd pi .~2)
=/  e         .~2.718281828
=/  rtol       .~1e-5
|%
++  factorial
  |=  x=@rd  ^-  @rd
  =/  t=@rd  .~1
  |-  ^-  @rd
  ?:  =(x .~1)
    t
  $(x (sub:rd x .~1), t (mul:rd t x))
++  absolute
  |=  x=@rd  ^-  @rd
  ?:  (gth:rd x .~0)
    x
  (sub:rd .~0 x)
++  floor
  |=  x=@rd  ^-  @ud
  ?:  =(x .~0.0)  0
  =/  floor=@ud  0
  =/  floor-rd=@rd  .~1.0
  |-
  :: ~&  [%floor floor floor-rd]
  ?:  (gth:rd floor-rd x)  floor
  $(floor +(floor), floor-rd (add:rd floor-rd .~1))
++  floor-remainder
  |=  x=@rd  ^-  @rd
  ?:  =(x .~0.0)  .~0.0
  =/  floor=@rd  .~0.0
  =/  floor-rd=@rd  .~1.0
  |-
  :: ~&  [%floor-remainder floor floor-rd]
  ?:  (gth floor-rd x)  (sub:rd x floor)
  $(floor (add:rd floor .~1), floor-rd (add:rd floor-rd .~1))
++  round
  |=  x=@rd  ^-  @ud
  =/  num  (floor x)
  =/  rem  (floor-remainder x)
  =/  next-digit  (floor (mul:rd rem .~10))
  :: ~&  [%round num rem next-digit]
  ?:  (lth next-digit 5)  num
  +(num)
++  exp
  |=  x=@rd  ^-  @rd
  =/  rtol  .~1e-5
  =/  p   .~1
  =/  po  .~-1
  =/  i   .~1
  |-  ^-  @rd
  ?:  (lth:rd (absolute (sub:rd po p)) rtol)
    p
  $(i (add:rd i .~1), p (add:rd p (div:rd (pow-n x i) (factorial i))), po p)
++  pow-n
  ::  restricted pow, based on integers only
  |=  [x=@rd n=@rd]  ^-  @rd
  ?:  =(n .~0)  .~1
  =/  p  x
  |-  ^-  @rd
  ?:  (lth:rd n .~2)
    p
  ::~&  [n p]
  $(n (sub:rd n .~1), p (mul:rd p x))
++  sin
  ::  sin x = x - x^3/3! + x^5/5! - x^7/7! + x^9/9! - ...
  |=  x=@rd  ^-  @rd
  =/  rtol  .~1e-5
  =/  p   .~0
  =/  po  .~-1
  =/  i   .~0
  |-  ^-  @rd
  ?:  (lth:rd (absolute (sub:rd po p)) rtol)
    p
  =/  ii  (add:rd (mul:rd .~2 i) .~1)
  =/  term  (mul:rd (pow-n .~-1 i) (div:rd (pow-n x ii) (factorial ii)))
  ::~&  [i ii term p]
  $(i (add:rd i .~1), p (add:rd p term), po p)
++  cos
  ::  cos x = 1 - x^2/2! + x^4/4! - x^6/6! + x^8/8! - ...
  |=  x=@rd  ^-  @rd
  =/  rtol  .~1e-5
  =/  p   .~1
  =/  po  .~-1
  =/  i   .~1
  |-  ^-  @rd
  ?:  (lth:rd (absolute (sub:rd po p)) rtol)
    p
  =/  ii  (mul:rd .~2 i)
  =/  term  (mul:rd (pow-n .~-1 i) (div:rd (pow-n x ii) (factorial ii)))
  ::~&  [i ii term p]
  $(i (add:rd i .~1), p (add:rd p term), po p)
++  tan
  ::  tan x = sin x / cos x
  |=  x=@rd  ^-  @rd
  (div:rd (sin x) (cos x))
  ::  don't worry about domain errors right now, this is lazy trig
++  log-e-2
  ::  natural logarithm, only converges for z < 2
  |=  z=@rd  ^-  @rd
  =/  rtol  .~1e-5
  =/  p   .~0
  =/  po  .~-1
  =/  i   .~1
  |-  ^-  @rd
  ?:  (lth:rd (absolute (sub:rd po p)) rtol)
    p
  =/  ii  (add:rd .~1 i)
  =/  term  (mul:rd (pow-n .~-1 (add:rd .~1 i)) (div:rd (pow-n (sub:rd z .~1) i) i))
  ::~&  [i ii term p]
  $(i (add:rd i .~1), p (add:rd p term), po p)
++  log-e
  ::  natural logarithm, z > 0
  |=  z=@rd  ^-  @rd
  =/  rtol  .~1e-5
  =/  p   .~0
  =/  po  .~-1
  =/  i   .~0
  |-  ^-  @rd
  ?:  (lth:rd (absolute (sub:rd po p)) rtol)
    (mul:rd (div:rd (mul:rd .~2 (sub:rd z .~1)) (add:rd z .~1)) p)
  =/  term1  (div:rd .~1 (add:rd .~1 (mul:rd .~2 i)))
  =/  term2  (mul:rd (sub:rd z .~1) (sub:rd z .~1))
  =/  term3  (mul:rd (add:rd z .~1) (add:rd z .~1))
  =/  term  (mul:rd term1 (pow-n (div:rd term2 term3) i))
  ::~&  [i term p]
  $(i (add:rd i .~1), p (add:rd p term), po p)
++  pow
  ::  general power, based on logarithms
  ::  x^n = exp(n ln x)
  |=  [x=@rd n=@rd]  ^-  @rd
  (exp (mul:rd n (log-e x)))
++  to-rad
  |=  deg=@rd  ^-  @rd
  (mul:rd (div:rd deg .~180.00) pi)
++  acos
  ::
  ::  https://opensource.apple.com/source/Libm/Libm-315/Source/Intel/acos.c
  ::
  |=  x=@rd  ^-  @rd
  ?:  (lth .~-0.4 x)
    ?:  (lth .~-0.6 x)
      (n-tail x)
    (gap x)
  ?:  (lte x .~0.4)
    (center x)
  ?:  (lte x .~0.6)
    (gap x)
  (p-tail x)
++  center
  |=  x=@rd  ^-  @rd
  ~&  ['called center' x]
  =/  p03  .~0.166666666666625133184818
  =/  p05  .~0.7500000000967090522908427e-1
  =/  p07  .~0.4464285630020156622713320e-1
  =/  p09  .~0.3038198238851575770651788e-1
  =/  p11  .~0.2237115216935265224962544e-1
  =/  p13  .~0.1736953298172084894468665e-1
  =/  p15  .~0.1378527665685754961528021e-1
  =/  p17  .~0.1277870997666947910124296e-1
  =/  p19  .~0.4673473145155259234911049e-2
  =/  p21  .~0.1951350766744288383625404e-1
  =/  x-squared  (mul:rd x x)
  =/  poly  %+  mul:rd  x-squared
    %+  add:rd  p03  %+  mul:rd  x-squared
    %+  add:rd  p05  %+  mul:rd  x-squared
    %+  add:rd  p07  %+  mul:rd  x-squared
    %+  add:rd  p09  %+  mul:rd  x-squared
    %+  add:rd  p11  %+  mul:rd  x-squared
    %+  add:rd  p13  %+  mul:rd  x-squared
    %+  add:rd  p15  %+  mul:rd  x-squared
    %+  add:rd  p17  %+  mul:rd  x-squared
    %+  add:rd  p19  (mul:rd x-squared p21)
  =/  diff  (add:rd x (mul:rd poly x))
  (sub:rd half-pi diff)
++  gap
  |=  x=@rd  ^-  @rd
  ~&  ['called gap' x]
  =/  p03  .~0.1666666544260252354339083
  =/  p05  .~0.7500058936188719422797382e-1
  =/  p07  .~0.4462999611462664666589096e-1
  =/  p09  .~0.3054999576148835435598555e-1
  =/  p11  .~0.2090953485621966528477317e-1
  =/  p13  .~0.2626916834046217573905021e-1
  =/  p15  .~-0.2496419961469848084029243e-1
  =/  p17  .~0.1336320190979444903198404
  =/  p19  .~-0.2609082745402891409913617
  =/  p21  .~0.4154485118940996442799104
  =/  p23  .~-0.3718481677216955169129325
  =/  p25  .~0.1791132167840254903934055
  =/  x-squared  (mul:rd x x)
  =/  poly  %+  mul:rd  x-squared
    %+  add:rd  p03  %+  mul:rd  x-squared
    %+  add:rd  p05  %+  mul:rd  x-squared
    %+  add:rd  p07  %+  mul:rd  x-squared
    %+  add:rd  p09  %+  mul:rd  x-squared
    %+  add:rd  p11  %+  mul:rd  x-squared
    %+  add:rd  p13  %+  mul:rd  x-squared
    %+  add:rd  p15  %+  mul:rd  x-squared
    %+  add:rd  p17  %+  mul:rd  x-squared
    %+  add:rd  p19  %+  mul:rd  x-squared
    %+  add:rd  p21  %+  mul:rd  x-squared
    %+  add:rd  p23  (mul:rd x-squared p25)
  =/  diff  (mul:rd poly x)
  (sub:rd half-pi (add:rd diff x))
++  n-tail
  |=  x=@rd  ^-  @rd
  ~&  ['called n-tail' x]
  =/  p00  .~1.5707956513160834076561054
  =/  p01  .~0.2145907003920708442108238
  =/  p02  .~0.8896369437915166409934895e-1
  =/  p03  .~0.5039488847935731213671556e-1
  =/  p04  .~0.3239698582040400391437898e-1
  =/  p05  .~0.2133501549935443220662813e-1
  =/  p06  .~0.1317423797769298396461497e-1
  =/  p07  .~0.7016307696008088925432394e-2
  =/  p08  .~0.2972670140131377611481662e-2
  =/  p09  .~0.9157019394367251664320071e-3
  =/  p10  .~0.1796407754831532447333023e-3
  =/  p11  .~0.1670402962434266380655447e-4
  ?:  (lth .~-1 x)  !!
    ?.  (gth .~-1 x)  pi
  =/  poly  %+  mul:rd  (sqt:rd (add:rd .~1 x))
    %+  add:rd  p00  %+  mul:rd  x
    %+  add:rd  p01  %+  mul:rd  x
    %+  add:rd  p02  %+  mul:rd  x
    %+  add:rd  p03  %+  mul:rd  x
    %+  add:rd  p04  %+  mul:rd  x
    %+  add:rd  p05  %+  mul:rd  x
    %+  add:rd  p06  %+  mul:rd  x
    %+  add:rd  p07  %+  mul:rd  x
    %+  add:rd  p08  %+  mul:rd  x
    %+  add:rd  p09  %+  mul:rd  x
    %+  add:rd  p10  (mul:rd x p11)
  (sub:rd pi poly)
++  p-tail
  |=  x=@rd  ^-  @rd
  ~&  ['called p-tail' x]
  =/  p00  .~1.5707956046853235350824205
  =/  p01  .~-0.2145900291823555067724496
  =/  p02  .~0.8895931658903454714161991e-1
  =/  p03  .~-0.5037781062999805015401690e-1
  =/  p04  .~0.3235271184788013959507217e-1
  =/  p05  .~-0.2125492340970560944012545e-1
  =/  p06  .~0.1307107321829037349021838e-1
  =/  p07  .~-0.6921689208385164161272068e-2
  =/  p08  .~0.2912114685670939037614086e-2
  =/  p09  .~-0.8899459104279910976564839e-3
  =/  p10  .~0.1730883544880830573920551e-3
  =/  p11  .~-0.1594866672026418356538789e-4
  ?:  (gth x .~1)  !!
    ?.  (lth x .~1)  .~0
  =/  t0  %+  mul:rd  x
    %+  add:rd  p01  %+  mul:rd  x
    %+  add:rd  p02  %+  mul:rd  x
    %+  add:rd  p03  %+  mul:rd  x
    %+  add:rd  p04  %+  mul:rd  x
    %+  add:rd  p05  %+  mul:rd  x
    %+  add:rd  p06  %+  mul:rd  x
    %+  add:rd  p07  %+  mul:rd  x
    %+  add:rd  p08  %+  mul:rd  x
    %+  add:rd  p09  %+  mul:rd  x
    %+  add:rd  p10  (mul:rd x p11)
  (mul:rd (sqt:rd (sub:rd .~1 x)) (add:rd t0 p00))
--
