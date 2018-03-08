import QtQuick 2.9
import QtQuick.Window 2.2
import "animate.js" as MyScript
Window {
    visible: true
    width: 640
    height: 480
    title: qsTr("Цветной дождь")

    property int w: width
    property int h: height

    Canvas  {
        id: cvs
        anchors.fill: parent

         //renderStrategy: Canvas.Cooperative // Will work as well but animation chops on my computer from time to time
        //запускаем рендеринг в отдельном потоке
         renderStrategy: Canvas.Threaded

        contextType: "2d"

        Component.onCompleted: {
            MyScript.init(w, h)
        }
        onPaint: {
            //console.timeEnd( "t" )
            if ( context ) {
                MyScript.anim(context)
            }
            //console.time("t")
        }
        Timer {
            interval: 50
            repeat: true
            running: true

            onTriggered: {
                //перерисовываем область холста
                cvs.requestPaint()
            }
        }
    }
}
