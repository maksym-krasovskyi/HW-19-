const path = require('path')
const fs = require('fs')

function processNestedHtml(content, loaderContext) {
    let fileDir = path.dirname(loaderContext.resourcePath)
    const INCLUDE_PATTERN =
        /\<include src=\"(\.\/)?(.+)\"\/?\>(?:\<\/include\>)?/gi

    function replaceHtml(match, pathRule, src) {
        if (pathRule === './') {
            fileDir = loaderContext.context
        }
        const filePath = path.resolve(fileDir, src)
        loaderContext.dependency(filePath)

        const html = fs.readFileSync(filePath, 'utf8')
        return processNestedHtml(html, loaderContext, filePath)
    }

    if (!INCLUDE_PATTERN.test(content)) {
        return content
    } else {
        return content.replace(INCLUDE_PATTERN, replaceHtml)
    }
}

module.exports = processNestedHtml
