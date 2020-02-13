package mn.openlayers.wms

import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.http.HttpResponse
import io.micronaut.http.server.types.files.StreamedFile
import io.micronaut.http.MediaType
import io.micronaut.http.HttpParameters

@Controller("/wms")
class WmsController {
    WebMappingService webMappingService

    WmsController(WebMappingService webMappingService) {
        this.webMappingService = webMappingService
    }

    @Get(uri="/", produces=[MediaType.IMAGE_PNG])
    HttpResponse<StreamedFile> index(HttpParameters params) {
        StreamedFile tile = webMappingService.getTile(params)

        return HttpResponse.ok(tile)
    }
}