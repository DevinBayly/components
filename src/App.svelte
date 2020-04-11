<script>
	export let name;
	import {store} from "./mystore.js"
	import { right,left,progBar } from "./actionbase.js";
	let s = store()
	let graphic = progBar()
	graphic.register(s)
	graphic.init()
	let l = left()
	l.register(s)
	l.init()
	let r = right()
	r.register(s)
	r.init()

</script>

