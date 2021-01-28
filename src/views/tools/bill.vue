<template>
  <div>
    <Button type="primary" @click="excelUpload">上传excel</Button>
    <input
      style="display: none"
      ref="fileInput"
      @change="uploadExcel"
      value="EXCEL导入"
      type="file"
      accept=".xls, .xlsx"
    />
    <Button type="primary" @click="excelDownLoad">导出excel</Button>
    <Table :columns="columns" :data="tableData" :height="600">
      <template slot="judgeNum" slot-scope="{ row, index }">
        {{ row.judgeNum }} {{ row.judgeNum == row.num ? "对" : "错" }}
      </template>
      <template slot="judgePrice" slot-scope="{ row, index }">
        {{ row.judgePrice }}
        {{ row.judgePrice == row.allPrice ? "对" : "错" }}
      </template>
    </Table>
  </div>
</template>

<script>
import excel from "@/libs/excel";
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
          title: "日期",
          key: "date",
        },
        {
          title: "姓名",
          key: "name",
        },
        {
          title: "数量",
          key: "num",
        },
        {
          title: "单价",
          key: "price",
        },
        {
          title: "总价",
          key: "allPrice",
        },
        {
          title: "发票数量",
          key: "num1",
        },
        {
          title: "重复发票金额",
          key: "price1",
        },
        {
          title: "重复单张发票货物数量",
          key: "num2",
        },
        {
          title: "单独发票金额",
          key: "price2",
        },
        {
          title: "单独单张发票货物数量",
          key: "num3",
        },
        {
          title: "校验数量",
          slot: "judgeNum",
        },
        {
          title: "校验金额",
          slot: "judgePrice",
        },
      ],
    };
  },

  computed: {},

  mounted() {},

  methods: {
    excelUpload() {
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
            let tmpObj = {
              num: Number(item.数量),
              price: Number(item.单价),
              allPrice: Number(item.总价),
              date: item.日期,
              name: item.姓名,
              num1: 0,
              price1: 0,
              num2: 0,
              price2: 0,
              num3: 0,
              judgeNum: 0,
              judgePrice: 0,
            };
            let temp = vm.handle(tmpObj);
            tmp.push(temp);
          });
          vm.tableData = tmp;
        }
      };
    },
    handle(e) {
      let tmp = e;
      let num1 = Math.floor(tmp.allPrice / 10000) + 1;
      let price1 = Math.ceil(tmp.allPrice / num1);
      // let price1 = parseInt((tmp.allPrice / num1).toFixed(1));
      // let num2 = Math.ceil((price1 / tmp.price * 10).toFixed(1)) / 10;
      let num2 = Math.ceil(((price1 / tmp.price) * 10).toFixed(1)) / 10;
      price1 = (num2 * tmp.price).toFixed(1) - "";
      if (price1 >= 10000) {
        num2 = num2 - 0.1;
        price1 = (num2 * tmp.price).toFixed(1) - "";
        num1 = num1 + 1;
      }
      let price2 = (tmp.allPrice - (num1 - 1) * price1).toFixed(1) - "";
      let num3 = (tmp.num - (num1 - 1) * num2).toFixed(2) - "";
      tmp.num1 = num1;
      tmp.price1 = price1;
      tmp.num2 = num2;
      tmp.price2 = price2;
      tmp.num3 = num3;
      tmp.judgeNum = ((num1 - 1) * num2 + num3).toFixed(2) - "";
      tmp.judgePrice = ((num1 - 1) * price1 + price2).toFixed(0) - "";
      return tmp;
    },
    excelDownLoad() {

    }
  },

  watch: {},
};
</script>
<style lang='less' scoped>
</style>