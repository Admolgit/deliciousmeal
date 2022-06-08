import { motion } from "framer-motion";

import Veggie from "../components/Veggie";
import Popular from "../components/Popular";

export default function Home (){
    return(
        <motion.div
            animate= {{opacity: 1}}
            initial = {{opacity: 0}} 
            exit = {{opacity: 0}}
            transition = {{duration: .5}}
        >
            <Veggie/>
            <Popular/>
        </motion.div>
    )
}