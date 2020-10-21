var devil;
(function (devil) {
    /**
     * 绘图工具类
     * @author        devil
     * @version       V20190131
     * @create        2019-01-31
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var GraphicsUtil = /** @class */ (function () {
        function GraphicsUtil() {
        }
        GraphicsUtil.createRectSprite = function (x, y, width, height, color, alpha) {
            if (color === void 0) { color = 0; }
            if (alpha === void 0) { alpha = 1; }
            var result = devil.Manager.pool.createSprite();
            this.drawRect(result.graphics, x, y, width, height, color, alpha);
            return result;
        };
        GraphicsUtil.createRectShape = function (x, y, width, height, color, alpha) {
            if (color === void 0) { color = 0; }
            if (alpha === void 0) { alpha = 1; }
            var result = devil.Manager.pool.createShape();
            this.drawRect(result.graphics, x, y, width, height, color, alpha);
            return result;
        };
        GraphicsUtil.drawRect = function (graphics, x, y, width, height, color, alpha) {
            if (color === void 0) { color = 0; }
            if (alpha === void 0) { alpha = 1; }
            graphics.clear();
            graphics.beginFill(color, alpha);
            graphics.drawRect(x, y, width, height);
            graphics.endFill();
        };
        GraphicsUtil.createCircleSprite = function (x, y, radius, color, alpha) {
            if (color === void 0) { color = 0; }
            if (alpha === void 0) { alpha = 1; }
            var result = devil.Manager.pool.createSprite();
            this.drawCircle(result.graphics, x, y, radius, color, alpha);
            return result;
        };
        GraphicsUtil.createCircleShape = function (x, y, radius, color, alpha) {
            if (color === void 0) { color = 0; }
            if (alpha === void 0) { alpha = 1; }
            var result = devil.Manager.pool.createShape();
            this.drawCircle(result.graphics, x, y, radius, color, alpha);
            return result;
        };
        GraphicsUtil.drawCircle = function (graphics, x, y, radius, color, alpha) {
            if (color === void 0) { color = 0; }
            if (alpha === void 0) { alpha = 1; }
            graphics.clear();
            graphics.beginFill(color, alpha);
            graphics.drawCircle(x, y, radius);
            graphics.endFill();
        };
        GraphicsUtil.createRectBoderShape = function (x, y, width, height, color, alpha) {
            if (color === void 0) { color = 0; }
            var result = devil.Manager.pool.createShape();
            result.graphics.lineStyle(.1, color);
            result.graphics.drawRect(x, y, width, height);
            return result;
        };
        /**
         * 绘制弧形
         * @param graphics
         * @param x
         * @param y
         * @param r
         * @param color
         * @param angle			角度，以度为单位
         * @param startFrom
         */
        GraphicsUtil.drawSector = function (graphics, x, y, r, color, angle, startFrom) {
            graphics.clear();
            graphics.beginFill(color, 1);
            graphics.lineStyle(0, color);
            graphics.moveTo(x, y);
            angle = (Math.abs(angle) > 360) ? 360 : angle;
            var n = Math.ceil(Math.abs(angle) / 45);
            var angleA = angle / n;
            angleA = angleA * Math.PI / 180;
            startFrom = startFrom * Math.PI / 180;
            graphics.lineTo(x + r * Math.cos(startFrom), y + r * Math.sin(startFrom));
            for (var i = 1; i <= n; i++) {
                startFrom += angleA;
                var angleMid = startFrom - angleA / 2;
                var bx = x + r / Math.cos(angleA / 2) * Math.cos(angleMid);
                var by = y + r / Math.cos(angleA / 2) * Math.sin(angleMid);
                var cx = x + r * Math.cos(startFrom);
                var cy = y + r * Math.sin(startFrom);
                graphics.curveTo(bx, by, cx, cy);
            }
            if (angle != 360) {
                graphics.lineTo(x, y);
            }
            graphics.endFill();
        };
        /**
         * 画虚线
         * @param graphics
         * @param x
         * @param y
         * @param dashedWidth		虚线线段的长度
         * @param space				虎线线段间距
         * @param width				整个虚线的宽度
         * @param color
         * @param alpha
         */
        GraphicsUtil.drawDashed = function (graphics, x, y, dashedWidth, space, width, color, alpha) {
            if (color === void 0) { color = 0; }
            if (alpha === void 0) { alpha = 1; }
            graphics.clear();
            var count = Math.ceil(width / (dashedWidth + space));
            graphics.lineStyle(1, color, alpha);
            var startX = x;
            for (var i = 0; i < count; i++) {
                startX = i * (dashedWidth + space) + x;
                graphics.moveTo(startX, y);
                graphics.lineTo(startX + dashedWidth, y);
            }
        };
        return GraphicsUtil;
    }());
    devil.GraphicsUtil = GraphicsUtil;
})(devil || (devil = {}));
