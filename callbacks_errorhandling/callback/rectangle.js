module.exports = (w, l, callback) => {
    if (l <= 0 || w <= 0) {
        setTimeout(() => {
            callback(new Error("Rectangle dimension should be greater than zero"), null);
        }, 2000)
        console.log(`Calculate perimeter and area with = ${w}, and length = ${l}`)
    } else {
        setTimeout(() => {
            callback(null,
                {
                    perimeter: 2 * (l + w),
                    area: l * w
                }
            )
        }, 2000)
    }
};