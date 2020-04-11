// now store is in the observer paradigm, must trigger the next queue of things
export let store = () => {
    let ob = {}
    ob.change = (new_state) => {

        // maybe tis is where the undo prev could be 
        ob.state = new_state
    }
    ob.update = () => {
        console.log("updating", ob.state);

        // do thinngs related to the state the application is in
        // this is the specific scene code
        if (ob.state.match(/specscene/)) {
            console.log("specific scene")
        } else if (ob.state == "prevscene") {
            console.log("previous");
        } else if (ob.state == "nextscene") {
            console.log("next scene");
        }
        // moving forward stuff
        // place moving backwards functions here
    }
    return ob
}
