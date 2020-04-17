const rect = require('./rectangle');

const sloveRectangle = (w, l) => {
    console.log(`Sloving a Rectangle with Width = ${w} and Length = ${l}`);

    rect(w, l, (err, rectangle) => {
        if (err) {
            console.log(`Error : ${err.message}`);
        } else {
            console.log(`The perimeter of Rectangle with Width = ${w} and Length = ${l} is : ${rectangle.perimeter}`);
            console.log(`The area of Rectangle with Width = ${w} and Length = ${l} is : ${rectangle.area}`)
        }
    });

}

sloveRectangle(2,4);
sloveRectangle(3,4);