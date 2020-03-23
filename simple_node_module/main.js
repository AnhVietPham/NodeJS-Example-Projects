const rect = require('./rectangle');

const solveRectangle = (x, y) => {
    console.log(`Calculate perimeter and area with = ${x} and length = ${y}`);

    if (x <= 0 || y <= 0){
        console.log(`Rectangle dimensions should be greater than zero: With = ${x} and Length = ${y}`);
    }else{
        console.log(`The area of rectangle is ${rect.area(x,y)}`);
        console.log(`The perimeter of rectangle is ${rect.perimeter(x,y)}`);
    }
}

solveRectangle(2,4);
solveRectangle(3,4);