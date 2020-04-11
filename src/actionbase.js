import { progressBar, barState } from "./bar.js"



let actionBase = () => {
    let ob = {}
    // override this
    ob.actionstate = ""
    ob.trigger = {}
    ob.register = (store) => {
        ob.trigger = () => {
            store.change(ob.actionstate)
            store.update()
        }
    }
    return ob
}

export let progBar = () => {
    let ob = {}
    ob.barState = barState()
    ob.d3graph = progressBar()
    ob.init = () => {
        ob.holder = document.createElement("div")
        ob.holder.id = "target"
        document.body.append(ob.holder)
        ob.barState.createCircles(10)
        ob.barState.forward()
        ob.d3graph.configure(200, 1000, 20)
        ob.d3graph.setData(ob.barState.data)
        ob.d3graph.make()
        ob.barState.setBar(ob.d3graph)
        // make connection with the underlying graph
        ob.d3graph.actionCallback =function (value) {
            // can't be arrow, something screwey happens
            ob.base.actionstate = `specscene ${value}`
            ob.base.trigger()
        }
    }
    ob.base = actionBase()
    ob.register = ob.base.register
    ob.base.actionstate = "specscene"
    return ob
}

export let left = () => {
    // get the trigger and the register for free
    let ob = {}
    ob.base = actionBase()
    ob.register = ob.base.register
    ob.base.actionstate = "prevscene"
    ob.init = () => {
        // make button and connect it to the trigger
        ob.ele = document.createElement("button")
        ob.ele.innerHTML = "left"
        ob.ele.addEventListener("click", ob.base.trigger)
        document.body.append(ob.ele)
    }
    return ob
}
export let right = () => {
    // get the trigger and the register for free
    let ob = {}
    ob.base = actionBase()
    ob.register = ob.base.register
    ob.base.actionstate = "nextscene"
    ob.init = () => {
        // make button and connect it to the trigger
        ob.ele = document.createElement("button")
        ob.ele.innerHTML = "Right"
        ob.ele.addEventListener("click", ob.base.trigger)
        document.body.append(ob.ele)
    }
    return ob
}