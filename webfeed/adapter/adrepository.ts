// 서버에서 ad를 보낸 json을 담당하는 dto
class AdJsonDto {
    toDomain(): Ad {
        return new Ad()
    }
}

class BridgesvcAdRepository extends AdRepository {
    getAd(): Ad[] {
        let jsonDto = this.sendHttpRequest()
        let result = jsonDto.map(x => x.toDomain())
        return result
    }
    sendHttpRequest(): AdJsonDto[] {
        return [new AdJsonDto()]
    }
}
