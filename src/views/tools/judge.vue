<template>
  <div>
    <div style="margin: 10px 0 10px 0">
      <Button type="primary" @click="excelUpload">上传第一份excel</Button>
      <input
        style="display: none"
        ref="fileInput"
        @change="uploadExcel"
        value="EXCEL导入"
        type="file"
        accept=".xls, .xlsx"
      />
      <Button type="primary" @click="excelUpload_">上传第二份excel</Button>
      <input
        style="display: none"
        ref="fileInput_"
        @change="uploadExcel_"
        value="EXCEL导入"
        type="file"
        accept=".xls, .xlsx"
      />
      <!-- <Button type="primary" style="margin-left: 20px" @click="exportExcel"
        >导出excel</Button
      > -->
      <Button type="primary" @click="clear" style="margin-left: 20px"
        >清空表格</Button
      >
    </div>
    <Table :columns="columns" :data="tableData" :height="tableHeight">
      <!-- <template slot="judge" slot-scope="{ row, index }">
        
      </template> -->
    </Table>
  </div>
</template>

<script>
import excel from "@/libs/excel";
import arithmetic from "@/libs/arithmetic";
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      typeList: [".xls", ".xlsx"],
      tableData: [],
      columns: [
        {
          title: "编号",
          type: "index",
          width: "80",
        },
        {
          title: "姓名",
          key: "name",
        },
        {
          title: "工资一",
          key: "price1",
        },
        {
          title: "工资二",
          key: "price2",
        },
        {
          title: "对比",
          key: "judge",
        },
      ],
      tableHeight: window.innerHeight - 100,
      first: false,
    };
  },

  computed: {},

  mounted() {
    let vm = this;
    window.onresize = () => {
      return (() => {
        vm.tableHeight = window.innerHeight - 100;
      })();
    };
  },

  methods: {
    clear() {
      this.tableData = [];
      this.first = false;
    },
    excelUpload() {
      this.first = true;
      this.$refs.fileInput.click();
    },
    uploadExcel(e) {
      console.log(e);
      let vm = this;
      let name = e.target.files[0].name;
      let type = name.slice(name.lastIndexOf("."));
      if (this.typeList.indexOf(type) < 0) {
        this.$Message.warning("请上传excel文件");
        return;
      }
      var reader = new FileReader();
      reader.readAsBinaryString(e.target.files[0]);
      reader.onload = function (re) {
        console.log(re);
        let data = re.target.result;
        let test = excel.read(data, "binary");
        console.log(test);
        let result = test.results;
        let tmp = [];
        if (result.length > 0) {
          result.forEach((item, index) => {
            tmp.push({
              name: item.姓名,
              price1: item.本期收入,
            });
          });
          vm.tableData = tmp;
          e.target.value = "";
        }
      };
    },
    excelUpload_() {
      if (this.first) {
        this.$refs.fileInput_.click();
      } else {
        this.$Message.warning("请先上传第一份文件");
      }
    },
    uploadExcel_(e) {
      console.log(e);
      let vm = this;
      let name = e.target.files[0].name;
      let type = name.slice(name.lastIndexOf("."));
      if (this.typeList.indexOf(type) < 0) {
        this.$Message.warning("请上传excel文件");
        return;
      }
      var reader = new FileReader();
      reader.readAsBinaryString(e.target.files[0]);
      reader.onload = function (re) {
        console.log(re);
        let data = re.target.result;
        let test = excel.read(data, "binary", 3);
        console.log(test);
        let result = test.results;
        let tmp = [];
        if (result.length > 0) {
          result.forEach((item, index) => {
            let tmpObj = {};
            vm.tableData.forEach((ele) => {
              if (item.姓名 == ele.name) {
                tmpObj = {
                  ...ele,
                };
                tmpObj.price2 = item.应发金额;
                if (Number(tmpObj.price2) == Number(tmpObj.price1)) {
                  tmpObj.judge = "相等";
                } else {
                  tmpObj.judge = "不相等";
                }
              }
            });
            tmp.push(tmpObj);
          });
          vm.tableData = tmp;
          e.target.value = "";
        }
      };
    },
  },

  watch: {},
};
</script>
<style lang='less' scoped>
</style>