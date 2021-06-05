import React, {useState, useContext} from 'react';
import {FirebaseContext} from './../../firebase/';
import Swal from './Swal';
import * as CGeneral from './../../constantes/general/CGeneral';

const GrillaLugares = ({estacionamiento, cantidadLugares, lugares, posiciones}) => {
    const {firebase} = useContext(FirebaseContext);
    const [numeroLugar, setNumeroLugar] = useState(0);
    console.log(lugares.find(lugar => lugar.posicion === '1'))
    async function handleChangePosicion (e) {
        if (numeroLugar === cantidadLugares) {
            await firebase.asignarPosiciones(estacionamiento, posiciones);
            Swal(CGeneral.OPERACION_COMPLETADA, 'Se han asignado todos los lugares');
        }
        else {
            const lugar = {
                ...lugares[numeroLugar],
                "posicion": e.currentTarget.name
            }
            posiciones.push(lugar);
            console.log(posiciones)
            setNumeroLugar(numeroLugar +1);
            e.currentTarget.innerText = numeroLugar +1;
            e.currentTarget.disabled = true;
            }
        }
    return (
    <>
    <div>
        <div style={{justifyContent: 'center', display: 'flex'}}>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="1" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="2" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="3" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="4" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="5" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="6" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="7" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="8" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="9" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="10" onClick={handleChangePosicion}></button>
        </div>
        <div style={{justifyContent: 'center', display: 'flex'}}>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="11" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="12" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="13" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="14" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="15" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="16" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="17" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="18" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="19" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="20" onClick={handleChangePosicion}></button>
        </div>
        <div style={{justifyContent: 'center', display: 'flex'}}>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="21" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="22" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="23" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="24" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="25" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="26" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="27" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="28" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="29" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="30" onClick={handleChangePosicion}></button>
        </div>
        <div style={{justifyContent: 'center', display: 'flex'}}>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="31" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="32" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="33" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="34" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="35" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="36" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="37" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="38" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="39" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="40" onClick={handleChangePosicion}></button>
        </div>
        <div style={{justifyContent: 'center', display: 'flex'}}>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="41" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="42" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="43" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="44" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="45" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="46" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="47" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="48" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="49" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="50" onClick={handleChangePosicion}></button>
        </div>
        <div style={{justifyContent: 'center', display: 'flex'}}>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="51" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="52" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="53" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="54" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="55" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="56" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="57" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="58" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="59" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="60" onClick={handleChangePosicion}></button>
        </div>
        <div style={{justifyContent: 'center', display: 'flex'}}>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="61" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="62" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="63" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="64" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="65" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="66" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="67" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="68" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="69" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="70" onClick={handleChangePosicion}></button>
        </div>
        <div style={{justifyContent: 'center', display: 'flex'}}>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="71" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="72" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="73" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="74" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="75" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="76" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="77" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="78" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="79" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="80" onClick={handleChangePosicion}></button>
        </div>
        <div style={{justifyContent: 'center', display: 'flex'}}>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="81" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="82" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="83" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="84" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="85" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="86" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="87" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="88" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="89" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="90" onClick={handleChangePosicion}></button>
        </div>
        <div style={{justifyContent: 'center', display: 'flex'}}>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="91" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="92" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="93" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="94" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="95" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="96" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="97" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="98" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="99" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10, cursor: 'pointer'}} name="100" onClick={handleChangePosicion}></button>
        </div>
    </div>
    </>
    );
}
 
export default GrillaLugares;