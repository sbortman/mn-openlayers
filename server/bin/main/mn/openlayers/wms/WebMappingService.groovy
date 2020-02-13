package mn.openlayers.wms

import javax.inject.Singleton
import io.micronaut.http.server.types.files.StreamedFile
import io.micronaut.http.MediaType
import java.awt.Color
import java.awt.Graphics2D
import java.awt.image.BufferedImage
import javax.imageio.ImageIO 

import org.slf4j.Logger
import org.slf4j.LoggerFactory

import io.micronaut.http.HttpParameters

@Singleton
class WebMappingService {
    
    static final Logger log = LoggerFactory.getLogger(WebMappingService)

    StreamedFile getTile(HttpParameters params)
    {
        log.info params.asMap()?.toString()

        BufferedImage image = new BufferedImage(256, 256, BufferedImage.TYPE_INT_ARGB)
        ByteArrayOutputStream ostream = new ByteArrayOutputStream()
        Graphics2D g2d = image.createGraphics()

        g2d.color = Color.red
        g2d.drawRect(0, 0, image.width, image.height)
        g2d.dispose()

        ImageIO.write(image, 'png', ostream)

        new StreamedFile(new ByteArrayInputStream(ostream.toByteArray()), MediaType.IMAGE_PNG)
    }
}