import {useStyles} from '../estacionamientos/Styles';
import React, {useState} from 'react';
const GrillaLugares = ({cantidadLugares}) => {
    const classes = useStyles();
    const [numeroLugar, setNumeroLugar] = useState(1);
    let arreglo = [];
    const handleChangePosicion = (e) => {
        if (numeroLugar === cantidadLugares +1) {
            alert('Se han asignado todos los lugares')
            console.log(arreglo);
        }
        else {
            setNumeroLugar(numeroLugar +1);
            let lugar = {
                "lugar": numeroLugar,
                "posicion": e.currentTarget.name
            }
            arreglo.push(lugar);
            console.log(arreglo);
            e.currentTarget.innerText = numeroLugar;
            e.currentTarget.disabled = true;
            }
        }
    return (
    <>
    <div>
        <div style={{justifyContent: 'center', display: 'flex'}}>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="1" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="2" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10 }} name="3" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="4" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="5" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="6" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="7" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="8" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="9" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="10" onClick={handleChangePosicion}></button>
        </div>
        <div style={{justifyContent: 'center', display: 'flex'}}>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="11" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="12" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10 }} name="13" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="14" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="15" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="16" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="17" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="18" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="19" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="20" onClick={handleChangePosicion}></button>
        </div>
        <div style={{justifyContent: 'center', display: 'flex'}}>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="21" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="22" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10 }} name="23" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="24" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="25" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="26" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="27" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="28" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="29" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="30" onClick={handleChangePosicion}></button>
        </div>
        <div style={{justifyContent: 'center', display: 'flex'}}>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="31" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="32" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10 }} name="33" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="34" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="35" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="36" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="37" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="38" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="39" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="40" onClick={handleChangePosicion}></button>
        </div>
        <div style={{justifyContent: 'center', display: 'flex'}}>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="41" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="42" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10 }} name="43" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="44" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="45" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="46" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="47" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="48" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="49" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="50" onClick={handleChangePosicion}></button>
        </div>
        <div style={{justifyContent: 'center', display: 'flex'}}>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="51" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="52" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10 }} name="53" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="54" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="55" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="56" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="57" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="58" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="59" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="60" onClick={handleChangePosicion}></button>
        </div>
        <div style={{justifyContent: 'center', display: 'flex'}}>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="61" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="62" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10 }} name="63" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="64" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="65" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="66" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="67" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="68" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="69" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="70" onClick={handleChangePosicion}></button>
        </div>
        <div style={{justifyContent: 'center', display: 'flex'}}>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="71" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="72" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10 }} name="73" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="74" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="75" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="76" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="77" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="78" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="79" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="80" onClick={handleChangePosicion}></button>
        </div>
        <div style={{justifyContent: 'center', display: 'flex'}}>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="81" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="82" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10 }} name="83" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="84" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="85" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="86" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="87" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="88" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="89" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="90" onClick={handleChangePosicion}></button>
        </div>
        <div style={{justifyContent: 'center', display: 'flex'}}>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="91" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="92" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10 }} name="93" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="94" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="95" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="96" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="97" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="98" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="99" onClick={handleChangePosicion}></button>
            <button style={{borderRadius: 5, margin: 5 , width: 30, height: 30, color: "#000000", borderColor: "#000000", border: 10}} name="100" onClick={handleChangePosicion}></button>
        </div>
    </div>
    </>
    );
}
 
export default GrillaLugares;