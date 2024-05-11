/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import MDButton from "components/MDButton";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { useEffect, useState } from "react";

// Data
import myData from './data.json';

export default function data(page_num) {
  const [objs, setObjs] = useState([]);
  const [itemData, setItemData] = useState([]);
  const item_count = 10;

  const f = async () => {
    debugger
    async function get_lisskin_items(page_num) { // page
      //page_num = 1;
      const buff_items_ids = myData;
      const slice_start = (page_num-1) * item_count;
      const slice_end = slice_start + item_count;
      
      return await fetch('https://lis-skins.ru/market/dota2/?sort_by=hot&price_from=0.25').then(response => {
  
          return response.text()
      }).then((html) => {
          console.log(html)
          const regex_names = /(?<=<div class="name-inner">).*?(?=<\/div>)/g;
          var match_names = html.match(regex_names);
          const regex_prices = /(?<=<div class="price">).*?(?=<\/div>)/g;
          var match_prices = html.match(regex_prices);
          const regex_satis_sayisi = /<div class="similar-count"\s[^>]*>(.*)\s+[^>]/g;
          var math_satis_sayisiices = html.match(regex_satis_sayisi);
          const regex_lis_sayi = /<div data-link([\s\S]*?)<\/span><\/div>/gm;
          var eslesme = html.match(regex_lis_sayi);  // starting-point
          
          debugger
          const result = match_names.slice(slice_start, slice_end).map((item_name, index) => {
              const id = buff_items_ids.find(item => item.Name === item_name)?.ID;
              
              return {
                  id: id,
                  item_name,
                  lisskin_price: match_prices.slice(slice_start, slice_end)[index].replaceAll('$', ''),
                  lisskin_satis_sayisi: math_satis_sayisiices.slice(slice_start, slice_end)[index],
              }
          });
          setItemData(result);
          return result;
      })
    };
  
    async function get_buff_price_byId(id) {
        var items = []; 
        return await fetch('https://buff.163.com/api/market/goods/sell_order?game=dota2&page_num=1&sort_by=default&goods_id='+id)
        .then(response => {

          return response.json();
        }).then(res => {
          items = res.data.items;
          console.log(res.data.items[0].price)
          return { price: items[0].price, satis_sayisi: res.data.total_count, icon_url: res.data.goods_infos[id].icon_url }; 
            
        }).catch(error => console.log(error))
        
    } 
  
    async function get_buff_price_byName(name) {
        var result =  await fetch('https://buff.163.com/api/market/goods?game=dota2&page_num=1&search='+str(name), {
            method: "GET",
            headers: {
                "Cookie": ""
            }
        })
        .then(response => {
            return response.json();
        }).then(res => {
            items = res.data.items;
            return items.find(x => x.name = name).sell_min_price; 
            
        }).catch(error => console.log(error))
        
    }
  
    function str(str) {
        var stryArr = str.split(' ');
  
        return stryArr.join('+');
    }

    async function compare_prices() {
        
        const lisskin_items = await get_lisskin_items(page_num);
        const price_satis_url = [];
        for (var i=0; i<item_count; i++) {
          price_satis_url.push(await get_buff_price_byId(lisskin_items[i].id));
        }
        const items = []
        const compared_items = lisskin_items.map((item, index) => {
          var price = parseFloat(price_satis_url[index]?.price); // sikinti olabilir
          console.log(price)
            items.push({
                ...item,
                icon_url: price_satis_url[index]?.icon_url,
                buff_price: (price*0.14).toFixed(2),
                buff_satis_sayisi: price_satis_url[index]?.satis_sayisi,
                kar: (((price*0.14).toFixed(2) - (price*0.14).toFixed(2)*0.018 - item.lisskin_price) * 100 / item.lisskin_price).toFixed(2) + '%'
            })
            
        })
        debugger
        items.sort((a, b) => parseFloat(b.kar.split(" ")[0]) - parseFloat(a.kar.split(" ")[0]))
        console.log(items)
        setObjs(items);
    }

    await compare_prices();
    
  }
  useEffect(() => {
    
    f();
    
  }, [])
  
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );
  const obsj = [
    {
      item_adi: "off yarra",
      lis_: "dsfsd",
      lis_1: "dsfsd",
      lis_2: "dsfsd",
      lis_3: "dsfsd",
    },
  ];
  // setObjs([
  //   {
  //     item_adi: "ssas",
  //     lis_: "dsfsd",
  //     lis_1: "dsfsd",
  //     lis_2: "dsfsd",
  //     lis_3: "dsfsd",
  //   },
  // ]);
  return {
    columns: [
      { Header: "item adı", accessor: "item_adı", width: "45%", align: "left" },
      { Header: "Lisskin Fiyati", accessor: "Lisskin_Fiyati", align: "center" },
      { Header: "buff fiyati", accessor: "buff_fiyati", align: "center" },
      { Header: "kar", accessor: "kar", align: "center" },
      { Header: "buff satis sayısı", accessor: "buff_satis_sayisi", align: "center" },
      { Header: "lis satis sayısı", accessor: "lis_satis_sayisi", align: "center" },
      { Header: "incele", accessor: "incele_butonu", align: "center" },
    ],

    // rows: objs.map((item, index) => {
    //   const item_url = `https://buff.163.com/goods/${item.id}?from=market#tab=selling`;
    //   return {
    //     item_adı: <Author image={item?.icon_url} name={item?.item_name} email="Dota 2" />,
    //     Lisskin_Fiyati: (
    //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //         {item.lisskin_price}
    //       </MDTypography>
    //     ),
    //     buff_fiyati: (
    //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //         {item.buff_price}
    //       </MDTypography>
    //     ),
    //     buff_satis_sayisi: (
    //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //         {item.buff_satis_sayisi}
    //       </MDTypography>
    //     ),
        //lis_satis_sayisi: (
          //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          //         {item.lisskin_satis_sayisi}
          //       </MDTypography>
          //     ),
    //     kar: (
    //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //         {item.kar}
    //       </MDTypography>
    //     ),
    //     incele_butonu: (
    //       <MDButton variant="gradient" color="info"><a href={item_url} target="_blank" rel="noreferrer">İncele</a></MDButton>
    //     )
    //   }
    // })
    rows: [
      {
        item_adı: page_num.toString(),
        Lisskin_Fiyati: page_num,
              buff_fiyati: 10,
              buff_satis_sayisi: 99,
              lis_satis_sayisi: 100,
              kar: "55 %",
              incele_butonu: (
                <MDBox>
                    <MDButton variant="gradient" color="info"><a href="https://lis-skins.ru/profile/inventory/" target="_blank" rel="noreferrer" size="small">Lis</a></MDButton>
                    <MDButton variant="gradient" color="info"><a href="https://lis-skins.ru/profile/inventory/" target="_blank" rel="noreferrer">Buff</a></MDButton>
                    <MDButton variant="gradient" color="info"><a href="https://lis-skins.ru/profile/inventory/" target="_blank" rel="noreferrer">Grafik</a></MDButton>
                </MDBox>
              )
          }
    ],
  }
}
