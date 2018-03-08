.pragma library

var  w,
        h,
        //ускорение, прибавляем к dotsVel[i] на каждой итерации цикла
        accelleration = .01,
        //ширина линии равна 1 пиксель
        size = 1,
        //repaintColor = 'rgba(0, 0, 0, 0.05)',
        repaintColor =Qt.rgba(0, 0, 0, 0.05),
        colors = [],
        dots = [],
        //скорость движения точки на холсте
        dotsVel = [];

function anim(ctx){
    //при каждом вызове функции мы накладываем на холст полупрозрачный слой,
    //благодаря этому получается затухающий след линии
    ctx.fillStyle = repaintColor;
    ctx.fillRect(0, 0, w, h);

    for(var i = 0; i < w; ++i){
        //изначально 50 процентов dots[i] имеют значение 0, поэтому их обрабатываем в ветви else
        if(dots[i]){
            var currentY = dots[i] - 1
            dots[i] += dotsVel[i] += accelleration

            ctx.fillStyle = 'hsl('+ colors[i] + ', 80%, 50%)'
            ctx.fillRect(i, currentY, size, dotsVel[i] + 1)
        } else {
            //в рандоме обрабатываем нулевые значения dots[i]
            if(Math.random() < .01)
               //новые значения рисуем на 1/3 выше холста, чтобы на экране появлялись готовые линии, а не точки
                dots[i] = Math.floor(Math.random()*h/3)*(-1)
        }

        if(dots[i] > h){
          dots[i] = 0
          dotsVel[i] = 0
        }
      }

}

function init(width, height) {
    w = width
    h = height

    //в массив colors[] заносим раномерное распределение цвета на 360 градусов
    var portion = 360/width
    for(var i = 0; i < width; ++i){
        colors[i] = portion * i
        //в массив dots[] заносим случайное значение начального положения пикселя на холсте
        //умножение на 2 даёт гарантию что 50 процентов холста будут заполнены линиями
        dots[i] = (!Math.floor((Math.random() * 2))) ? (Math.floor((Math.random() * height))) : 0
        dotsVel[i] = 0
    }
}
