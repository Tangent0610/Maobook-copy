/* eslint-disable prettier/prettier */
import '../Store/style/ProductListStyle.scss';
import { useState, useEffect } from 'react';
import { Col, Row, Accordion, Card, Modal, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'
import axios from 'axios';
import { API_URL } from "../../utils/config";
import Swal from 'sweetalert2'

//元件
import ProductItem from "./components/ProductItem"

//圖片
import searchIcon from "./storePic/searchIcon.svg";
import dogIcon from "./storePic/dogIcon.svg";
import catIcon from "./storePic/catIcon.svg";
import Checkbox from "./components/Checkbox";
import Pagination from "./components/Pagination";

function ProductList(props) {

    const [data, setData] = useState([]);//存商品資料
    const [lastPage, setLastPage] = useState(1);
    const [page, setPage] = useState(1);
    const [value, setValue] = useState("");//搜尋Bar存值
    const [value1, setValue1] = useState(value);//搜尋Bar渲染用
    const [category, setCategory] = useState('all');//判斷按鈕分類用

    //篩選bar用
    const [filter, setFilter] = useState('犬');
    const [filterPet, setFilterPet] = useState([]);
    const [filterProduct, setFilterProduct] = useState([]);
    const [filterBrand, setFilterBrand] = useState([]);
    //紀錄checkbox選取項目
    const [checkState, setcheckState] = useState("");
    const [checkedPet, setCheckedPet] = useState([]);
    const [checkedProduct, setCheckedProduct] = useState([]);
    const [checkedBrand, setCheckedBrand] = useState([]);

    //加入購物車
    const [mycart, setMycart] = useState([])

    //加入購物車訊息窗用
    const [show, setShow] = useState(false)
    const [productName, setProductName] = useState("")


    //購物車判斷
    const ADDToLocalStorage = (item) => {
        const currentCart = JSON.parse(localStorage.getItem('cart')) || []

        // find if the product in the localstorage with its id
        const index = currentCart.findIndex((v) => v.id === item.id)
        console.log("index", index)
        // found: index! == -1
        if (index > -1) {
            //currentCart[index].amount++
            // setProductName('這個商品已經加過了')
            // handleShow()
            Swal.fire(
                "這個商品已經加過了", //標題 
                "", //訊息內容(可省略)
                "warning" //圖示(可省略) success/info/warning/error/question
            );
            return
        } else {
            currentCart.push(item)
        }

        localStorage.setItem('cart', JSON.stringify(currentCart))

        // 設定資料
        setMycart(currentCart)
        // setProductName( item.name +'\n已成功加入購物車' )
        // handleShow()
        Swal.fire(
            '成功加入購物車!', //標題
            '', //訊息內容(可省略)
            'success' //圖示(可省略) success/info/warning/error/question
          )
               

    }



    //篩選
    useEffect(() => { //全部產品跟分頁
        const Search = async () => {
            let url = `${API_URL}/store/productlist`;
            if (category !== 'all') { //用狀態判斷來串接
                url = url + "/" + category;
            };

            const where = []

            if (checkedPet) {
                where.push(`pet_category_id IN (${checkedPet})`)
            }
            if (checkedProduct) {
                where.push(`product_category_id IN (${checkedProduct})`)
            }
            if (checkedBrand) {
                where.push(`brand_category_id IN (${checkedBrand})`)
            }

            let SQLL = ""
            SQLL += where.length > 0 ? 'WHERE ' + where.join(' AND ') : ''
            // SQLimage = SQLimage + ' ' + group
            console.log(SQLL)
            setcheckState(SQLL)


            // &checkState=${checkState}
            //${API_URL}/store/productlist?page=${page}&search=${value1}&animal=${filter}&checkedPet=${checkedPet}&checkedProduct=${checkedProduct}&checkedBrand=${checkedBrand}
            //全部產品+searchbar+ filter分類名稱
            let response = await axios.get(`${url}?page=${page}&search=${value1}&animal=${filter}&checkedPet=${checkedPet}&checkedProduct=${checkedProduct}&checkedBrand=${checkedBrand}`, { withCredentials: true });
            setData(response.data.data);
            setLastPage(response.data.pagination.lastPage);
            setFilterPet(response.data.filterPet);
            setFilterProduct(response.data.filterProduct);
            setFilterBrand(response.data.filterBrand);
        };
        Search();
    }, [page, category, value1, filter, checkedPet, checkedProduct, checkedBrand, checkState]);

    //四個按鈕分類
    const SearchFood = async () => {
        setPage(1);
        setCategory('food');
        setValue1("");
        setCheckedPet("")
        setCheckedProduct("")
        setCheckedBrand("")
    };
    const SearchSnack = async () => {
        setPage(1);
        setCategory('snack');
        setValue1("");
        setCheckedPet("")
        setCheckedProduct("")
        setCheckedBrand("")
    };
    const SearchToy = async () => {
        setPage(1);
        setCategory('toy');
        setValue1("");
        setCheckedPet("")
        setCheckedProduct("")
        setCheckedBrand("")
    };
    //搜尋bar,存值用
    const handleInputChange = (e) => {
        setValue(e.target.value); // 拿到 input 的 value
    }
    const SearchAll = () => {
        setPage(1);
        setCategory('all')
        setValue1("")
        setCheckedPet("")
        setCheckedProduct("")
        setCheckedBrand("")
    };
    const SearchBar = () => {
        setPage(1);
        setCategory('all')
        setValue1(value);
        setCheckedPet("")
        setCheckedProduct("")
        setCheckedBrand("")
    };



    //篩選bar
    const filterDog = () => {
        setFilter('犬')
        setCategory('all');
        setCheckedPet("")
        setCheckedProduct("")
        setCheckedBrand("")
    };
    //{filter? filterDog()'}
    const filterCat = () => {
        setFilter('貓');
        setCategory('all');
        setCheckedPet("")
        setCheckedProduct("")
        setCheckedBrand("")
    };


    const haveProduct = ( //渲染產品
        <Row xs={2} md={3}>

            {data.map((product) => {
                return (
                    <Col className="mb-3" >
                        <ProductItem
                            name={product.name}
                            price={product.price}
                            des={product.description}
                            stock={product.stock_num}
                            image={product.image}
                            id={product.id}
                            ADDToLocalStorage={ADDToLocalStorage} />
                    </Col>
                )
            })}
        </Row>
    );

    const noProduct = (

        <div>沒有符合的產品，請重新搜尋</div>
    );

    //購物車加入視窗
    // const handleClose = () => setShow(false)
    // const handleShow = () => setShow(true)

    // const messageModal = (
    //     <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
    //         <Modal.Header closeButton>
    //             <Modal.Title>{productName}</Modal.Title>
    //         </Modal.Header>
    //         <Modal.Footer>
    //             <Button variant="secondary" size="sm" onClick={handleClose}>
    //                 繼續購物
    //             </Button>
    //             <Button
    //                 variant="primary"
    //                 size="sm"
    //                 onClick={() => {
    //                     props.history.push('/store/cart')
    //                 }}
    //             >
    //                 前往購物車結帳
    //             </Button>
    //         </Modal.Footer>
    //     </Modal>
    // )





    return (
        <>
            {/* {messageModal} */}
            <div>
                <section className='wrap1'>
                    <div className='btnarea mb-5 d-flex justify-content-between'>
                        <div id={'a'} className='protext1 bg-white'>毛孩選物指南</div>
                        <button className='select-btn' onClick={SearchAll} >全部產品</button>
                        <button className='select-btn' onClick={SearchFood} >吃飯飯</button>
                        <button className='select-btn' onClick={SearchSnack} >吃點心</button>
                        <button className='select-btn' onClick={SearchToy}>玩玩具</button>
                        <div>
                            <input className='search' type="text" name="search" value={value} onChange={handleInputChange} placeholder="找什麼呢" />
                            <button onClick={SearchBar}><img className="searchIcon" src={searchIcon} alt="searchIcon" /></button>
                        </div>
                    </div>
                </section>

                <section >
                    <Row className='wrap2' xs={1} md={2}>
                        <Col xs={6} md={3}>
                            <Row xs={1} md={1} className='d-flex mt-5'>
                                <Col className='d-flex justify-content-center' >  {/* 狗貓Btn*/}
                                    <button className="mr-4" onClick={filterDog} ><img className="dogIcon" src={dogIcon} alt="dogIcon" /></button>
                                    <button onClick={filterCat} ><img className="catIcon" src={catIcon} alt="catIcon" /></button>
                                </Col>
                                <Col className=' d-flex mt-3 justify-content-center' > {/* 分類區*/}
                                    <Accordion className='categoryArea pt-3' defaultActiveKey="0">
                                        <Card className='categoryCard'>
                                            <Accordion.Toggle className='categoryHeader' as={Card.Header} eventKey="0">
                                                年齡
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="0">
                                                <Card.Body className='categoryBody'>
                                                    <Checkbox filterName={filterPet} checkeds={checkedPet} setCheckeds={setCheckedPet} />
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                        <Card className='categoryCard'>
                                            <Accordion.Toggle className='categoryHeader' as={Card.Header} eventKey="1">
                                                類別
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="1">
                                                <Card.Body className='categoryBody'>
                                                    <Checkbox filterName={filterProduct} checkeds={checkedProduct} setCheckeds={setCheckedProduct} />
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                        <Card className='categoryCard'>
                                            <Accordion.Toggle className='categoryHeader' as={Card.Header} eventKey="2">
                                                品牌
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="2">
                                                <Card.Body className='categoryBody'>
                                                    <Checkbox filterName={filterBrand} checkeds={checkedBrand} setCheckeds={setCheckedBrand} />
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>

                                </Col>
                                <Col> {/* 分頁區*/}
                                    {/* <ul>{getPages()}</ul> */}
                                    <div className='pages'><Pagination page={page} lastPage={lastPage} setPage={setPage} /></div>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12} md={6}>    {/* 商品列表*/}

                            {data.length ? haveProduct : noProduct}

                        </Col>
                    </Row>
                </section>
            </div>
        </>
    )
}

export default withRouter(ProductList); 