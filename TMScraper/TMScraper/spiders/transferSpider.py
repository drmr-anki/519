# -*- coding: utf-8 -*-
from scrapy.spider import CrawlSpider
from scrapy.xlib.pydispatch import dispatcher
from scrapy import signals


class TransferspiderSpider(CrawlSpider):
    handle_httpstatus_list = [404]
    http_user="am9999"
    http_pass="Maq930725" 
    name = 'transferSpider'
    allowed_domains = ['https://www.transfermarkt.com/jumplist/startseite/wettbewerb/CSL']
    start_urls = ['http://https://www.transfermarkt.com/jumplist/startseite/wettbewerb/CSL/']
    
    def __init__(self, category=None):
        self.failed_urls = []

    def parse(self, response):
        if response.status == 404:
            self.crawler.stats.inc_value('failed_url_count')
            self.failed_urls.append(response.url)

    def handle_spider_closed(spider, reason):
        self.crawler.stats.set_value('failed_urls', ','.join(spider.failed_urls))


    def process_exception(self, response, exception, spider):
        ex_class = "%s.%s" % (exception.__class__.__module__, exception.__class__.__name__)
        self.crawler.stats.inc_value('downloader/exception_count', spider=spider)
        self.crawler.stats.inc_value('downloader/exception_type_count/%s' % ex_class, spider=spider)

    dispatcher.connect(handle_spider_closed, signals.spider_closed)
