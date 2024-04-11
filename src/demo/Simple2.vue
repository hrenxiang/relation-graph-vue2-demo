<template>
  <div>
    <div style="height:calc(100vh); width: calc(100vw)">
      <RelationGraph ref="graphRef" :options="graphOptions">

        <template #node="{ node }">
          <template v-if="node.data.nodeType === 0">
            <div class="category" style="display: flex; flex-direction: column; align-items: center">
              <img :src="node.data.imgSrc" alt=""/>
              <span class="category-text">{{ node.text }}</span>
            </div>
          </template>
          <template v-else-if="node.data.nodeType !== 2">
            <div class="primary-node">
              <div class="primary-node-one" :style="{ background: node.data.nodeColor }">
                <svg-icon
                    icon-class="company"
                    style="width: 24px; height: 24px; padding-right: 4px"
                />
                {{ node.data.enterpriseName }}
              </div>
              <div class="primary-node-two">
                <template v-for="(item, index) in node.data.rightType">
                  <span class="primary-node-tag">{{ item }}</span>
                </template>
              </div>
              <div class="primary-node-three">
                <span>登记时间：{{ node.data.time }}</span>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="secondary-node">
              许可登记
            </div>
          </template>
        </template>

        <template #line="{ line, link }">
          <MyLine :link="link" :relation="line"/>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script>
// 如果您没有在main.js文件中使用Vue.use(RelationGraph); 就需要使用下面这一行代码来引入relation-graph
import RelationGraph from 'relation-graph';
import SvgIcon from "./SvgIcon/index.vue";
import MyLine from "./LineSlot2.vue";

export default {
  name: 'RelationGraphDemo',
  components: {MyLine, SvgIcon, RelationGraph},
  data() {
    return {
      fit: "fill",
      graphOptions: {
        debug: false,
        layout: {
          'layoutName': 'tree',
          'from': 'top',
          'min_per_width': undefined,
          'max_per_width': 300,
          'min_per_height': 800,
          'max_per_height': undefined,
        },
        defaultNodeShape: 1,
        defaultLineShape: 41,
        defaultPloyLineRadius: 4,
        defaultJunctionPoint: 'tb',
        defaultLineColor: 'rgba(0,0,0,0.2)',
        zoom: 80,
        defaultNodeWidth: 410,
        defaultNodeHeight: 130,
        defaultNodeColor: 'transparent',
        defaultNodeFontColor: 'black',
        defaultNodeBorderWidth: 0,
        reLayoutWhenExpandedOrCollapsed: true,
      }
    };
  },
  created() {
  },
  mounted() {
    this.setGraphData();
  },
  methods: {
    setGraphData() {
      let graphInstance = this.$refs.graphRef.getInstance();

      // 图谱数据
      const graphJsonData = {
        "rootId": "48eeec643b0542bf92aefa8f7cd1810b",
        "nodes": [
          {
            "id": "48eeec643b0542bf92aefa8f7cd1810b",
            "text": "数据资源",
            "color": null,
            "fontColor": null,
            "borderColor": null,
            "borderWidth": null,
            "width": "180",
            "height": "200",
            "expanded": null,
            "disableDrag": true,
            "disableDefaultClickEffect": true,
            "opacity": null,
            "x": null,
            "y": null,
            "fixed": null,
            "data": {
              "dataId": null,
              "nodeType": 0,
              "enterpriseIcon": null,
              "enterpriseName": null,
              "rightType": null,
              "time": null,
              "nodeColor": "#1A77FF",
              "imgSrc": "/src/assets/icon-shujuziyuan.png",
              "index": null,
              "spaceSize": null,
              "prevId": null,
              "nextId": null,
              "position": null
            },
            "children": null
          },
          {
            "id": "a45a7d6e9a2047c6ba1fd5803cc652d5",
            "text": null,
            "color": null,
            "fontColor": null,
            "borderColor": null,
            "borderWidth": null,
            "width": null,
            "height": null,
            "expanded": null,
            "disableDrag": true,
            "disableDefaultClickEffect": true,
            "opacity": null,
            "x": null,
            "y": null,
            "fixed": true,
            "data": {
              "dataId": null,
              "nodeType": 1,
              "enterpriseIcon": null,
              "enterpriseName": "33演示用户同步",
              "rightType": [
                "数据产品经营权"
              ],
              "time": "2024-04-01 15:55:16",
              "nodeColor": "#ADB6C2",
              "imgSrc": null,
              "index": 0.0,
              "spaceSize": 2,
              "prevId": "48eeec643b0542bf92aefa8f7cd1810b",
              "nextId": null,
              "position": null
            },
            "children": null
          },
          {
            "id": "75f75dce67854e64a3b2a81ff669c21b",
            "text": null,
            "color": null,
            "fontColor": null,
            "borderColor": null,
            "borderWidth": null,
            "width": "200",
            "height": "130",
            "expanded": null,
            "disableDrag": true,
            "disableDefaultClickEffect": true,
            "opacity": null,
            "x": null,
            "y": null,
            "fixed": true,
            "data": {
              "dataId": null,
              "nodeType": 2,
              "enterpriseIcon": null,
              "enterpriseName": null,
              "rightType": null,
              "time": null,
              "nodeColor": "#00C7A9",
              "imgSrc": null,
              "index": null,
              "spaceSize": null,
              "prevId": "a45a7d6e9a2047c6ba1fd5803cc652d5",
              "nextId": null,
              "position": "right"
            },
            "children": null
          },
          {
            "id": "a4ff4ad76970481da490bf6d94845100",
            "text": null,
            "color": null,
            "fontColor": null,
            "borderColor": null,
            "borderWidth": null,
            "width": null,
            "height": null,
            "expanded": null,
            "disableDrag": true,
            "disableDefaultClickEffect": true,
            "opacity": null,
            "x": null,
            "y": null,
            "fixed": true,
            "data": {
              "dataId": null,
              "nodeType": 3,
              "enterpriseIcon": null,
              "enterpriseName": "黄任翔111",
              "rightType": [
                "数据加工使用权",
                "数据产品经营权"
              ],
              "time": "2024-04-03 19:24:13",
              "nodeColor": "#00C7A9",
              "imgSrc": null,
              "index": -0.5,
              "spaceSize": null,
              "prevId": "75f75dce67854e64a3b2a81ff669c21b",
              "nextId": null,
              "position": "right"
            },
            "children": null
          },
          {
            "id": "87ab883725d94bd69e4327accb996bc8",
            "text": null,
            "color": null,
            "fontColor": null,
            "borderColor": null,
            "borderWidth": null,
            "width": null,
            "height": null,
            "expanded": null,
            "disableDrag": true,
            "disableDefaultClickEffect": true,
            "opacity": null,
            "x": null,
            "y": null,
            "fixed": true,
            "data": {
              "dataId": null,
              "nodeType": 3,
              "enterpriseIcon": null,
              "enterpriseName": "企业名称222222222222222",
              "rightType": [
                "数据加工使用权"
              ],
              "time": "2024-04-03 19:26:41",
              "nodeColor": "#00C7A9",
              "imgSrc": null,
              "index": 0.5,
              "spaceSize": null,
              "prevId": "75f75dce67854e64a3b2a81ff669c21b",
              "nextId": null,
              "position": "right"
            },
            "children": null
          },
          {
            "id": "7c7e3bbcaad944c38012603ed16a4725",
            "text": null,
            "color": null,
            "fontColor": null,
            "borderColor": null,
            "borderWidth": null,
            "width": null,
            "height": null,
            "expanded": null,
            "disableDrag": true,
            "disableDefaultClickEffect": true,
            "opacity": null,
            "x": null,
            "y": null,
            "fixed": true,
            "data": {
              "dataId": null,
              "nodeType": 1,
              "enterpriseIcon": null,
              "enterpriseName": "郑州数据交易中心测试公司",
              "rightType": [
                "数据产品经营权"
              ],
              "time": "2024-04-01 15:15:13",
              "nodeColor": "#ADB6C2",
              "imgSrc": null,
              "index": 1.0,
              "spaceSize": 5,
              "prevId": "a45a7d6e9a2047c6ba1fd5803cc652d5",
              "nextId": null,
              "position": null
            },
            "children": null
          },
          {
            "id": "a8b084d384884247a25b86d082719767",
            "text": null,
            "color": null,
            "fontColor": null,
            "borderColor": null,
            "borderWidth": null,
            "width": "200",
            "height": "130",
            "expanded": null,
            "disableDrag": true,
            "disableDefaultClickEffect": true,
            "opacity": null,
            "x": null,
            "y": null,
            "fixed": true,
            "data": {
              "dataId": null,
              "nodeType": 2,
              "enterpriseIcon": null,
              "enterpriseName": null,
              "rightType": null,
              "time": null,
              "nodeColor": "#00C7A9",
              "imgSrc": null,
              "index": null,
              "spaceSize": null,
              "prevId": "7c7e3bbcaad944c38012603ed16a4725",
              "nextId": null,
              "position": "left"
            },
            "children": null
          },
          {
            "id": "03ec07e177b64d468373870d8dc05e6c",
            "text": null,
            "color": null,
            "fontColor": null,
            "borderColor": null,
            "borderWidth": null,
            "width": null,
            "height": null,
            "expanded": null,
            "disableDrag": true,
            "disableDefaultClickEffect": true,
            "opacity": null,
            "x": null,
            "y": null,
            "fixed": true,
            "data": {
              "dataId": null,
              "nodeType": 3,
              "enterpriseIcon": null,
              "enterpriseName": "黄任翔111",
              "rightType": [
                "数据加工使用权",
                "数据产品经营权"
              ],
              "time": "2024-04-03 19:24:13",
              "nodeColor": "#00C7A9",
              "imgSrc": null,
              "index": -1.0,
              "spaceSize": null,
              "prevId": "a8b084d384884247a25b86d082719767",
              "nextId": null,
              "position": "left"
            },
            "children": null
          },
          {
            "id": "034cf071032542729d5c67f61ad9c071",
            "text": null,
            "color": null,
            "fontColor": null,
            "borderColor": null,
            "borderWidth": null,
            "width": null,
            "height": null,
            "expanded": null,
            "disableDrag": true,
            "disableDefaultClickEffect": true,
            "opacity": null,
            "x": null,
            "y": null,
            "fixed": true,
            "data": {
              "dataId": null,
              "nodeType": 3,
              "enterpriseIcon": null,
              "enterpriseName": "企业名称222222222222222",
              "rightType": [
                "数据加工使用权"
              ],
              "time": "2024-04-03 19:26:41",
              "nodeColor": "#00C7A9",
              "imgSrc": null,
              "index": 0.0,
              "spaceSize": null,
              "prevId": "a8b084d384884247a25b86d082719767",
              "nextId": null,
              "position": "left"
            },
            "children": null
          },
          {
            "id": "6054dc4954f243aabf3f065396a4eb37",
            "text": null,
            "color": null,
            "fontColor": null,
            "borderColor": null,
            "borderWidth": null,
            "width": null,
            "height": null,
            "expanded": null,
            "disableDrag": true,
            "disableDefaultClickEffect": true,
            "opacity": null,
            "x": null,
            "y": null,
            "fixed": true,
            "data": {
              "dataId": null,
              "nodeType": 3,
              "enterpriseIcon": null,
              "enterpriseName": "987654321987654323",
              "rightType": [
                "数据加工使用权",
                "数据产品经营权"
              ],
              "time": "2024-04-03 19:42:31",
              "nodeColor": "#00C7A9",
              "imgSrc": null,
              "index": 1.0,
              "spaceSize": null,
              "prevId": "a8b084d384884247a25b86d082719767",
              "nextId": null,
              "position": "left"
            },
            "children": null
          },
          {
            "id": "d11d2c1200994fd3857ec02764b524ab",
            "text": null,
            "color": null,
            "fontColor": null,
            "borderColor": null,
            "borderWidth": null,
            "width": null,
            "height": null,
            "expanded": null,
            "disableDrag": true,
            "disableDefaultClickEffect": true,
            "opacity": null,
            "x": null,
            "y": null,
            "fixed": true,
            "data": {
              "dataId": null,
              "nodeType": 1,
              "enterpriseIcon": null,
              "enterpriseName": "黄任翔111",
              "rightType": [
                "数据产品经营权"
              ],
              "time": "2024-04-01 15:15:13",
              "nodeColor": "#1A77FF",
              "imgSrc": null,
              "index": 2.0,
              "spaceSize": 5,
              "prevId": "7c7e3bbcaad944c38012603ed16a4725",
              "nextId": null,
              "position": null
            },
            "children": null
          }
        ],
        "lines": [
          {
            "from": "48eeec643b0542bf92aefa8f7cd1810b",
            "to": "a45a7d6e9a2047c6ba1fd5803cc652d5",
            "text": "转移登记",
            "opacity": null,
            "fromJunctionPoint": "bottom",
            "toJunctionPoint": "top",
            "color": "#ADB6C2",
            "lineWidth": 2,
            "lineShape": 2
          },
          {
            "from": "a45a7d6e9a2047c6ba1fd5803cc652d5",
            "to": "75f75dce67854e64a3b2a81ff669c21b",
            "text": null,
            "opacity": null,
            "fromJunctionPoint": "right",
            "toJunctionPoint": "left",
            "color": "#00C7A9",
            "lineWidth": 2,
            "lineShape": 1
          },
          {
            "from": "75f75dce67854e64a3b2a81ff669c21b",
            "to": "a4ff4ad76970481da490bf6d94845100",
            "text": null,
            "opacity": null,
            "fromJunctionPoint": "right",
            "toJunctionPoint": "left",
            "color": "#00C7A9",
            "lineWidth": 2,
            "lineShape": 4
          },
          {
            "from": "75f75dce67854e64a3b2a81ff669c21b",
            "to": "87ab883725d94bd69e4327accb996bc8",
            "text": null,
            "opacity": null,
            "fromJunctionPoint": "right",
            "toJunctionPoint": "left",
            "color": "#00C7A9",
            "lineWidth": 2,
            "lineShape": 4
          },
          {
            "from": "a45a7d6e9a2047c6ba1fd5803cc652d5",
            "to": "7c7e3bbcaad944c38012603ed16a4725",
            "text": "转移登记",
            "opacity": null,
            "fromJunctionPoint": "bottom",
            "toJunctionPoint": "top",
            "color": "#ADB6C2",
            "lineWidth": 2,
            "lineShape": 2
          },
          {
            "from": "7c7e3bbcaad944c38012603ed16a4725",
            "to": "a8b084d384884247a25b86d082719767",
            "text": null,
            "opacity": null,
            "fromJunctionPoint": "left",
            "toJunctionPoint": "right",
            "color": "#00C7A9",
            "lineWidth": 2,
            "lineShape": 1
          },
          {
            "from": "a8b084d384884247a25b86d082719767",
            "to": "03ec07e177b64d468373870d8dc05e6c",
            "text": null,
            "opacity": null,
            "fromJunctionPoint": "left",
            "toJunctionPoint": "right",
            "color": "#00C7A9",
            "lineWidth": 2,
            "lineShape": 4
          },
          {
            "from": "a8b084d384884247a25b86d082719767",
            "to": "034cf071032542729d5c67f61ad9c071",
            "text": null,
            "opacity": null,
            "fromJunctionPoint": "left",
            "toJunctionPoint": "right",
            "color": "#00C7A9",
            "lineWidth": 2,
            "lineShape": 4
          },
          {
            "from": "a8b084d384884247a25b86d082719767",
            "to": "6054dc4954f243aabf3f065396a4eb37",
            "text": null,
            "opacity": null,
            "fromJunctionPoint": "left",
            "toJunctionPoint": "right",
            "color": "#00C7A9",
            "lineWidth": 2,
            "lineShape": 4
          },
          {
            "from": "7c7e3bbcaad944c38012603ed16a4725",
            "to": "d11d2c1200994fd3857ec02764b524ab",
            "text": "转移登记",
            "opacity": null,
            "fromJunctionPoint": "bottom",
            "toJunctionPoint": "top",
            "color": "#1A77FF",
            "lineWidth": 2,
            "lineShape": 2
          }
        ]
      };

      const newJsonData = [];

      graphJsonData.nodes.forEach(nodeItem => {
        this.calculateNodeLayout(nodeItem, newJsonData, graphJsonData);
      });

      // 添加节点和连线
      graphInstance.addNodes(graphJsonData.nodes);
      graphInstance.addLines(graphJsonData.lines);

      // 执行布局和显示效果
      graphInstance.graphData.rootNode = graphInstance.getNodeById(graphJsonData.rootId);
      graphInstance.doLayout();
      graphInstance.moveToCenter();
      graphInstance.zoomToFit();
    },
    calculateNodeLayout(nodeItem, newJsonData, graphJsonData) {
      const nodeWidth = 410;
      const categoryNodeWidth = 180;
      const longitudinalSpacing = 400;

      let x, y;

      switch (nodeItem.data.nodeType) {
        case 0:
          x = -nodeWidth / 0.75 + (nodeWidth / 2 - categoryNodeWidth / 2);
          y = -longitudinalSpacing;
          break;
        case 1:
          x = -nodeWidth / 0.75;
          y = longitudinalSpacing * parseInt(nodeItem.data.index) + 115 * nodeItem.data.spaceSize - 50;
          break;
        case 2:
          let targetNode1 = graphJsonData.nodes.find(node => node.id === nodeItem.data.prevId);
          y = targetNode1.y;
          x = nodeItem.data.position === 'right' ? targetNode1.x + Math.abs(targetNode1.x) + 100 : targetNode1.x - 436;
          break;
        case 3:
          let targetNode2 = newJsonData.find(node => node.id === nodeItem.data.prevId);
          y = targetNode2.y + nodeItem.data.index * 230;
          x = nodeItem.data.position === 'right' ? targetNode2.x + longitudinalSpacing : targetNode2.x - 610;
          break;
        default:
          break;
      }

      nodeItem.x = x;
      nodeItem.y = y;
      nodeItem.fixed = true;
      newJsonData.push(nodeItem);
    }
  }
};
</script>
<style lang="scss" scoped>
.category-text {
  font-weight: 500;
  font-size: 16px;
  color: #000C19;
  line-height: 22px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.primary-node {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 8px 8px 8px 8px;
  border: 1px solid #E3E9F3;
}

.primary-node-one {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  padding: 12px 8px;
  font-weight: 500;
  font-size: 16px;
  color: #FFFFFF;
  line-height: 24px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  border-radius: 8px 8px 0 0;
}

.primary-node-two {
  padding: 0 16px;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  gap: 16px;
}

.primary-node-three {
  display: flex;
  flex-direction: row;
  justify-content: left;
  padding: 0 16px;
  margin-bottom: 16px;
}

.primary-node-tag {
  padding: 5px 8px;
  background-color: rgba(215, 220, 241, 0.8);
  border-radius: 3px;
  color: #6A84C6;
  font-size: 14px;
}

.secondary-node {
  width: calc(80%);
  height: 20%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #00C7A9;
  padding: 20px 0;
  margin: auto;
  color: #FFFFFF;
}

::v-deep {
  .relation-graph .rel-node-checked {
    transition: background-color .2s ease, outline .2s ease, color .2s ease, -webkit-box-shadow .2s ease;
    box-shadow: 0 0 0 6px rgba(89, 119, 192, 0.2) !important;
  }

  .relation-graph .rel-node-shape-1 {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    gap: 5px;
    //border: 1px solid;
  }

  .relation-graph .c-rg-line-checked-bg {
    stroke: none !important;
  }

  .relation-graph .c-rg-line-no-checked-bg2 {
    stroke: transparent !important;
  }

  .relation-graph .c-rg-line-checked-bg2 {
    stroke: #1A77FF;
  }
}

.list {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
