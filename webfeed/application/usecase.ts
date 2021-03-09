// DI
let adRepository = new AdRepository()
let contentRepository = new ContentRepository()

// DTO를 쓰지 않은 경우
class UseCase1 {
    getFeed(userId: string, appId: string, pointProviderKey: string): FeedItem[] {
        let ads = adRepository.getAd()
        let contents = contentRepository.getContent()
        return ads.concat(contents)
    }
}

// DTO를 use case의 인터페이스로 일부 사용한 경우 ==========

class UseCase2 {
    getFeed(getFeedCommand: GetFeedCommand): FeedItem[] {
        let ads = adRepository.getAd()
        let contents = contentRepository.getContent()
        return ads.concat(contents)
    }
}

// DTO를 use case의 인터페이스에 전부 사용한 경우 ==========

class UseCase3 {
    getFeed(getFeedCommand: GetFeedCommand): GetFeedResult {
        let ads = adRepository.getAd()
        let contents = contentRepository.getContent()

        let result = new GetFeedResult()
        result.from(ads.concat(contents))
        return result
    }
}

// DTO를 use case의 인터페이스에 전부 사용한 경우
// + cps 카테고리를 도메인 레이어에서 가져오고 싶은 경우

class UseCase4 {
    getFeed(getFeedCommand: GetFeedCommand): GetFeedResult1 {
        let ads = adRepository.getAd()
        let categories = this.extractCategories(ads)
        let contents = contentRepository.getContent()

        let result = new GetFeedResult1()
        result.setItems(ads.concat(contents))
        result.setCategories(categories)
        return result
    }
    
    extractCategories(ads: Ad[]): string[] {
        return ["식품", "가전"]
    }
}

// DTO를 use case의 인터페이스에 전부 사용한 경우
// + cps 카테고리 가져오는 로직을 서비스로 만들고 싶은 경우
// 서비스란? 어떤 도메인 객체에 속하지 않는 도메인 로직을 표현하는 방법입니다.
// https://laswonho.medium.com/domain-service-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-334aad46ac59

// DI
let cpsService = new CpsService()

class UseCase5 {
    getFeed(getFeedCommand: GetFeedCommand): GetFeedResult1 {
        let ads = adRepository.getAd()
        let categories = cpsService.extractCategories(ads)
        let contents = contentRepository.getContent()

        let result = new GetFeedResult1()
        result.setItems(ads.concat(contents))
        result.setCategories(categories)
        return result
    }
}
