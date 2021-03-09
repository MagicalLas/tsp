class FeedItem { }
class Ad extends FeedItem { }
class Content extends FeedItem { }

class AdRepository {
    getAd(): Ad[] {
        return []
    }
}
class ContentRepository {
    getContent(): Content[] {
        return []
    }
}

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

class GetFeedCommand {
    userId: string;
    appId: string;
    pointProviderKey: string;
}

class UseCase2 {
    getFeed(getFeedCommand: GetFeedCommand): FeedItem[] {
        let ads = adRepository.getAd()
        let contents = contentRepository.getContent()
        return ads.concat(contents)
    }
}

// DTO를 use case의 인터페이스에 전부 사용한 경우 ==========

class FeedItemDto {
    isAd: boolean
    title: string
    from(feedItem: FeedItem) {
        this.title = ""
    }
}

class GetFeedResult {
    items: FeedItemDto[]
    from(feedItems: FeedItem[]) {
        // convert FeedItem to FeedItemDto
    }
}

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

class GetFeedResult1 {
    items: FeedItemDto[]
    categories: string[]
    setItems(feedItems: FeedItem[]) {
        // convert FeedItem to FeedItemDto
    }
    setCategories(categories: string[]) {
        this.categories = categories
    }
}

function extractCategories(ads: Ad[]): string[] {
    return ["식품", "가전"]
}

class UseCase4 {
    getFeed(getFeedCommand: GetFeedCommand): GetFeedResult1 {
        let ads = adRepository.getAd()
        let categories = extractCategories(ads)
        let contents = contentRepository.getContent()

        let result = new GetFeedResult1()
        result.setItems(ads.concat(contents))
        result.setCategories(categories)
        return result
    }
}

// DTO를 use case의 인터페이스에 전부 사용한 경우
// + cps 카테고리 가져오는 로직을 서비스로 만들고 싶은 경우


class CpsService {
    extractCategories(ads: Ad[]): string[] {
        return ["식품", "가전"]
    }
}

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
