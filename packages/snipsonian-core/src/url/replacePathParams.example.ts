import replacePathParams from './replacePathParams';

replacePathParams({ url: 'http://some.domain.be/articles/{articleId}', params: { articleId: 1234 }});