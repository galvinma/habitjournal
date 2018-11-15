import moment from 'moment'

export function sortBulletObject(bullets)
{
    var keys = [];
    var sorted = {};

    for (var key in bullets)
    {
      if (bullets.hasOwnProperty(key))
      {
          keys.push(key);
      }
    }

    keys.sort(function (a, b) {
        return moment(b, 'dddd, MMMM Do, YYYY').unix() - moment(a, 'dddd, MMMM Do, YYYY').unix()
    })

    keys.forEach( (key) => {
        sorted[key] = bullets[key];
    });

    return sorted;
};
