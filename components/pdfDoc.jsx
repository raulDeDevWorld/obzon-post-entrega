import { Document, Page, View, Text, Image, PDFViewer, StyleSheet, Font } from "@react-pdf/renderer";
import { useUser } from "../context/Context.js"
import { useState, useRef, useEffect } from 'react'
// import DocUUID from './docUUID'
import Button from '../components/Button'
import { PDFDownloadLink } from "@react-pdf/renderer";


Font.register({ family: "Inter", src: "/assets/font.otf" })

const styles = StyleSheet.create({
    body: {
        position: 'relative',
        boxSizing: 'border-box',
        padding: ' 0.3cm 1cm',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        boxShadow: '0 0 5px 1px rgb(175, 175, 175)',
    },

    container: {
        position: 'relative',
        boxSizing: 'border-box',
        padding: '0px',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'rgb(255, 255, 255)',
        height: '100%',
        width: '100%',
        zIndex: '100',
    },
    box: {
        width: '50%',
        fontSize: '12px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '5mm 0'

    },
    text: {
        width: '100%',
        fontSize: '10px',
        textAlign: 'center',
        backgroundColor: 'white',
        margin: '2px 0'


    },
    image: {
        height: '1cm',
        width: '1cm',
    }
})

const PDFView = ({ uuid }) => {
    // const { image, setAlbunImage, templates, numeration, qr, dataUrl, uuid } = useUser()

    const [isCliente, setisCliente] = useState(false);


    function download(url) {
        window.open('https://www.google.com/?hl=es', '_system')
    }

    useEffect(() => {
        setisCliente(true)
    }, []);


    return (
        <div>
            {isCliente && <PDFDownloadLink document={
                <Document>
                    <Page size='A4' style={styles.body} >
                        <View style={styles.container} >
                            {uuid && uuid.map((i, index) =>
                                <View style={styles.box} key={index}>
                                    <Image src='/logo.png' style={styles.image}></Image>
                                    <Text style={styles.text}>Gracias por tu compra</Text>
                                    <Text style={styles.text}>Tu codigo de activación es el:</Text>
                                    <Text style={styles.text}>{i}  </Text>
                                </View>
                            )}
                        </View>
                    </Page>
                </Document>
            }
                fileName='Activadores'>

                {({ blob, url, loading, error }) =>
                    <Button style={'buttonPrimary'} click={(e)=>download(url)}>añadir</Button>
                }
            </PDFDownloadLink>}
        </div>
    )
}

export default PDFView




