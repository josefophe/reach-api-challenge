'reach 0.1';


/* eslint-disable */

export const main = Reach.App(() => {
    const A = Participant('Alice', {
        ready: Fun([], Null),
    })

    const B = API('Bob', {

    })

    init()

    A.only(() => {
        interact.ready()
    })
    A.publish()
    commit()
    exit()
})