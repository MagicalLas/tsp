class GetFeedCommand {
    userId: string;
    appId: string;
    pointProviderKey: string;
}

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