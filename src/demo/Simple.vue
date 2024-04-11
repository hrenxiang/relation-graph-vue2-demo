<template>
  <div style="" v-loading.body="g_loading">
    <div style="height:calc(100vh);width: calc(100vw)">
      <RelationGraph ref="graphRef" :options="graphOptions" :on-node-click="onNodeClick" :on-line-click="onLineClick">

        <template #node="{ node }">
          <template v-if="node.id === 'a1'">
            <div class="category" style="display: flex; flex-direction: column; align-items: center;gap: 14px">
              <img src="../assets/icon-yingyong.png" alt=""/>
              <span class="category-text">数据应用</span>
            </div>
          </template>
          <template v-if="node.id === 'a2'">
            <div class="category" style="display: flex; flex-direction: column; align-items: center">
              <img src="../assets/icon-shujuziyuan.png" alt=""/>
              <span class="category-text">数据资源</span>
            </div>
          </template>
          <template v-if="node.id === 'a3'">
            <div class="category" style="display: flex; flex-direction: column; align-items: center">
              <img src="../assets/icon-api.png" alt=""/>
              <span class="category-text">数据API {{ node.x }}</span>
            </div>
          </template>
          <template v-if="node.id === 'a4'">
            <div class="category" style="display: flex; flex-direction: column; align-items: center">
              <img src="../assets/icon-shujuji.png" alt=""/>
              <span class="category-text">数据集</span>
            </div>
          </template>

          <template v-if="node.id !== 'a1' && node.id !== 'a2' && node.id !== 'a3' && node.id !== 'a4'">
            <div class="graph-assets">
              <div class="graph-assets-one">
                <svg-icon
                    icon-class="company"
                    style="width: 24px; height: 24px; padding-right: 4px"
                />
                {{ node.data.enterpriseName }}
              </div>
              <div class="graph-assets-two">
                <template v-for="(item, index) in node.data.tags">
                  <span class="graph-assets-tag">{{ item }}</span>
                </template>
              </div>
              <div class="graph-assets-three">
                <span>登记时间：{{ node.data.time }}</span>
              </div>
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
import MyLine from "./Demo4AdvLineSlot2LineSlot.vue";
import IconApi from "../assets/icon-api@2x.png";
import SvgIcon from "./SvgIcon/index.vue";

export default {
  name: 'RelationGraphDemo',
  components: {SvgIcon, MyLine, RelationGraph},
  data() {
    return {
      fit: "fill",
      g_loading: false,
      graphOptions: {
        debug: false,
        layout: {
          'layoutName': 'folder',
          'from': 'top',
        },
        'defaultExpandHolderPosition': 'right',
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
    onNodeClick(node) {
      this.g_loading = true;
      let targetNode = this.$refs.graphRef.getNodeById(node.id);
      targetNode.expanded = !targetNode.expanded;
      let graphInstance = this.$refs.graphRef.getInstance();
      graphInstance.options.viewSize.width = graphInstance.$dom.getBoundingClientRect().width;
      graphInstance.options.viewSize.height = graphInstance.$dom.getBoundingClientRect().height;
      graphInstance.options.canvasZoom = 100;
      graphInstance.options.canvasOffset.x = graphInstance.options.viewNVInfo.width / 2;
      graphInstance.options.canvasOffset.y = graphInstance.options.viewNVInfo.height / 2;
      graphInstance.disableNextLayoutAnimation = true;
      graphInstance.doLayout();
      graphInstance.moveToCenter();
      graphInstance.zoomToFit();
      // graphInstance.playShowEffect();
    },
    onLineClick(line) {
      console.log(line, "====click")
    },
    setGraphData() {
      // 使用要点：通过节点属性expandHolderPosition: 'right' 和 expanded: false 可以让节点在没有子节点的情况下展示一个"展开"按钮
      //         通过onNodeExpand事件监听节点，在被展开的时候有选择的去从后台获取数据，如果已经从后台加载过数据，则让当前图谱根据当前的节点重新布局
      const rootNodeJson = [
        {
          'id': 'a1',
          'text': 'a',
          borderWidth: 1,
          borderColor: 'yellow',
          width: 180,
          height: 200,
          data: {
            img: '../assets/icon-api.png',
            index: 0,
          }
        },
        {
          'id': 'a2',
          'text': 'a',
          width: 180,
          height: 200,
          border: 'dashed',
          data: {
            img: '../assets/icon-api.png',
            index: 1,
          }
        },
        {
          'id': 'a3',
          'text': 'a',
          width: 180,
          height: 200,
          data: {
            img: '../assets/icon-api.png',
            index: 2,
          }
        },
        {
          'id': 'a4',
          'text': 'a',
          width: 180,
          height: 200,
          data: {
            img: '../assets/icon-api.png',
            index: 3,
          }
        },
        {
          'id': 'a',
          'text': 'a',
          // "offset_x": 384,
          // "offset_y":30,
          data: {
            'enterpriseName': '国家电网有限公司',
            'tags': ['数据资源持有权', '数据资源持有权', '数据加工使用权'],
            'time': "2024-04-02 16:00:00",
            sort: '0',
          },
          'children': [
            {
              'id': 'c',
              'text': 'c',
              data: {'enterpriseName': 'xxx国家有限公司', 'tags': ['数据加工使用权'], 'time': "2024-04-02 16:00:00"}
            },
            {
              'id': 'd',
              'text': 'd',
              data: {'enterpriseName': 'xxx集团有限公司', 'tags': ['数据加工使用权'], 'time': "2024-04-02 16:00:00"}
            },
            {
              'id': 'c1',
              'text': 'c',
              data: {'enterpriseName': 'xxx国家有限公司', 'tags': ['数据加工使用权'], 'time': "2024-04-02 16:00:00"}
            },
            {
              'id': 'd1',
              'text': 'd',
              data: {'enterpriseName': 'xxx集团有限公司', 'tags': ['数据加工使用权'], 'time': "2024-04-02 16:00:00"}
            },

          ]
        },
        {
          'id': 'b',
          'text': 'b',
          data: {
            'enterpriseName': '宁德时代新能源科技股份有限公司',
            'tags': ['数据资源持有权', '数据资源持有权', '数据加工使用权'],
            'time': "2024-04-02 16:00:00",
            sort: '1',
          },
          'children': [
            {
              'id': 'e',
              'text': 'e',
              data: {
                'enterpriseName': 'xxx国家有限公司2',
                'tags': ['数据加工使用权'],
                'time': "2024-04-02 16:00:00",
                sort: '1_1',
              }
            },
            {
              'id': 'f',
              'text': 'f',
              data: {'enterpriseName': 'xxx集团有限公司3', 'tags': ['数据加工使用权'], 'time': "2024-04-02 16:00:00",sort: '1_2',}
            }
          ]
        },
        {
          'id': 'b2',
          'text': 'b2',
          data: {
            'enterpriseName': '新能源科技股份有限公司',
            'tags': ['数据资源持有权', '数据资源持有权', '数据加工使用权'],
            'time': "2024-04-02 16:00:00",
            sort: 2,
          },
          'children': [
            {
              'id': 'i',
              'text': 'e',
              data: {'enterpriseName': 'xxx国家有限公司3', 'tags': ['数据加工使用权'], 'time': "2024-04-02 16:00:00",sort: '2_1',}
            },
            {
              'id': 'u',
              'text': 'f',
              data: {'enterpriseName': 'xxx集团有限公司3', 'tags': ['数据加工使用权'], 'time': "2024-04-02 16:00:00",sort: '2_2',}
            }
          ]
        }
      ];
      const graphInstance = this.$refs.graphRef.getInstance();
      const graphJsonData = {
        rootId: 'a',
        nodes: [],
        lines: [
          {
            from: 'a1',
            to: 'a',
            text: '初始登记',
            fromJunctionPoint: 'bottom',
            toJunctionPoint: 'top',
            lineShape: 42,
            opacity: 0
          },
          {
            from: 'a2',
            to: 'a',
            text: '初始登记',
            fromJunctionPoint: 'bottom',
            toJunctionPoint: 'top',
            lineShape: 42,
            opacity: 0
          },
          {from: 'a3', to: 'a', text: '初始登记', fromJunctionPoint: 'bottom', toJunctionPoint: 'top', lineShape: 42},
          {
            from: 'a4',
            to: 'a',
            text: '初始登记',
            fromJunctionPoint: 'bottom',
            toJunctionPoint: 'top',
            lineShape: 42,
            opacity: 0
          },
          {from: 'a', to: 'b', text: '转移登记', fromJunctionPoint: 'bottom', toJunctionPoint: 'top', lineShape: 43},
          {from: 'b', to: 'b2', text: '转移登记', fromJunctionPoint: 'bottom', toJunctionPoint: 'top', lineShape: 43}
        ]
      };
      // 将树状数据展开为扁平数据，里面的节点会被收集到graphJsonData.nodes, graphJsonData.lines
      graphInstance.flatNodeData(rootNodeJson, null, graphJsonData.nodes, graphJsonData.lines);

      graphJsonData.nodes.forEach(nodeItem => {
        let nodeWidth = 410 * graphInstance.options.canvasZoom * 0.01;
        let categoryNodeWidth = 180 * graphInstance.options.canvasZoom * 0.01;
        let space = nodeWidth + categoryNodeWidth;

        if (nodeItem.id === 'b' || nodeItem.id === 'a' || nodeItem.id === 'b2') {
          nodeItem.x = -(410 * (graphInstance.options.canvasZoom * 0.01)) / 1.1;
          nodeItem.y = 400 * parseInt(nodeItem.data.sort);
          nodeItem.fixed = true;

          // 计算子节点的位置
          if (nodeItem.children && nodeItem.children.length > 0) {
            let childX = 100; // 第一个子节点的初始 x 值
            let childY = nodeItem.y + 200; // 子节点的 y 值
            nodeItem.children.forEach((child, index) => {
              child.x = childX + index * 460;
              child.y = childY;
              child.fixed = true;
            });
          }
        } else if (nodeItem.id === 'a1' || nodeItem.id === 'a2' || nodeItem.id === 'a3' || nodeItem.id === 'a4') {
          nodeItem.x = -(410 * (graphInstance.options.canvasZoom * 0.01)) / 1.1 - categoryNodeWidth + ((nodeItem.data.index - 1) * space);
          nodeItem.y = -400;
          nodeItem.fixed = true;
        }
      })

      graphJsonData.lines.forEach(line => {
        if (line.to !== 'b' && line.to !== 'a' && line.to !== 'b2') {
          line.text = '许可登记';
          line.fromJunctionPoint = 'right';
          line.toJunctionPoint = 'top';
        }
      });
      console.log('graphJsonData:', graphJsonData);
      graphInstance.addNodes(graphJsonData.nodes);
      graphInstance.addLines(graphJsonData.lines);
      graphInstance.graphData.rootNode = graphInstance.getNodeById(graphJsonData.rootId);
      graphInstance.doLayout();
      graphInstance.playShowEffect();
    }
  }
};
</script>
<style lang="scss" scoped>
.category-text {
  font-family: PingFang SC, PingFang SC;
  font-weight: 500;
  font-size: 16px;
  color: #000C19;
  line-height: 22px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.graph-assets {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 8px 8px 8px 8px;
  border: 1px solid #E3E9F3;
}

.graph-assets-one {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  padding: 12px 8px;
  background: #1A77FF;
  font-weight: 500;
  font-size: 16px;
  color: #FFFFFF;
  line-height: 24px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  border-radius: 8px 8px 0 0;
}

.graph-assets-two {
  padding: 0 16px;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  gap: 16px;
}

.graph-assets-three {
  display: flex;
  flex-direction: row;
  justify-content: left;
  padding: 0 16px;
  margin-bottom: 16px;
}

.graph-assets-tag {
  padding: 5px 8px;
  background-color: rgba(215, 220, 241, 0.8);
  border-radius: 3px;
  color: #6A84C6;
  font-size: 14px;
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
