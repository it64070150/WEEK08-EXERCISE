# Web Programming - Exercise 8

#### 1. New Project
ให้นักศึกษาสร้างโปรเจคชื่อ `youblog` โดยมีวิธีการดังนี้

1. เปิด Terminal / Command Line
2. cd Desktop
3. mkdir youblog
4. cd youblog
5. npm init

ในขั้นตอนการ init ให้กำหนดดังนี้
- Package name : youblog
ส่วนอื่น ๆ ให้กด Enter ได้เลย

6. หลังจากนั้นให้พิมพ์ npm install express เพื่อลง Express

----

#### 2.	New Route
ทดลองสร้าง app และ route โดยให้นักศึกษาสร้างไฟล์ app.js และเขียนโค้ดดังนี้

const express = require('express')

const app = express()

app.get('/', (req, res) => {

  res.send('Hello World')

})

app.listen(3000, () => {

  console.log('Start server at port 3000.')

})


ทดลองดูผลลัพธ์ผ่านหน้าเว็บไซต์

----

#### 3.	Introduce Nodemon
เนื่องจากการแก้ไขไฟล์ทุกครั้ง เมื่อมีการแก้เราต้องทำการรัน node ใหม่ทุกครั้ง เราจะติดตั้ง nodemon เพื่อให้มีการ restart ไฟล์ใหม่ทุกครั้งที่มีการเปลี่ยนแปลง โดยให้ติดตั้งดังนี้

<code>
npm install -g nodemon

หรือ
npm install --save-dev nodemon
</code>

และทดลองใช้โดยเรียกคำสั่ง nodemon app

----
#### 4. Introduct RESTFUL API
ให้นักศึกษาดาวน์โหลดไฟล์ article-db.json วางบน main folder project
แก้ไขไฟล์ app.js โดยเพิ่มข้อมูลดังนี้


// ดึงข้อมูล json มาเก็บไว้ในตัวแปร

const article = require('./article-db')

// กำหนดให้ path blogapi แสดงข้อมูลบทความทั้งหมดในรูปแบบ json

app.get('/blogapi', (req, res) => {

  res.json(article)

})

// กำหนดให้ path blogapi/id แสดงข้อมูลบทความตาม id ที่กำหนด

app.get('/blogapi/:id', (req, res) => {

  res.json(article.find(article => article.id === req.params.id))

})


ทดลองดูได้ที่ http://localhost:3000/blogapi/ และ http://localhost:3000/blogapi/3

---
#### 5. 	Introduce Template Engine (ejs)
`npm install ejs`

สร้างโฟลเดอร์ใหม่ 3 โฟลเดอร์ ดังนี้
- public (สำหรับเก็บไฟล์ Asset ต่าง ๆ)
- routes ( สำหรับเก็บ app ย่อย ๆ เพื่อจัดการหน้าเพจในหมวดต่าง ๆ)
- views (สำหรับเก็บไฟล์ template ejs ที่ใช้เรียกแสดงผล) 

เปิดไฟล์ app.js และใส่โค้ด setup ด้านล่าง


const path = require('path')

// Setup ejs

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'public')))

// Config Router

const indexRouter = require('./routes/index')

app.use('/', indexRouter)

หลังจากนั้นทดลองสร้าง route ย่อย โดยสร้างไฟล์ชื่อ index.js ในโฟลเดอร์ routes และใส่โค้ดดังนี้


const express = require('express')

const router = express.Router()

router.get('/', function(req, res, next) {

    var data = { title: 'Express' }

    res.render('index', data)

})

module.exports = router

----
#### 6. ทดลองสร้างไฟล์ ejs เพื่อเรียกใช้งานจริง โดยให้แสดง data ที่ส่งเข้าไปในไฟล์

ให้นักศึกษาสร้างไฟล์ index.ejs ในโฟลเดอร์ views และนำโค้ดจากไฟล์ index-ejs.html ใส่ในไฟล์ index.ejs ในโปรเจคของเรา และ และลองเปิดหน้าเว็บไซต์ localhost:3000

----

#### 7.	ทดลอง Loop ชื่อบทความมาแสดงในรูปแบบ ul / li

แก้ไขไฟล์ routes/index.js ดังนี้


const express = require('express')

const router = express.Router()
 
var article = require('../article-db')

router.get('/', function(req, res, next) {

    var data = { title: 'Express', article: article }

    res.render('index', data)

})
 
module.exports = router


และเพิ่มโค้ดด้านล่างนี้ในไฟล์ views/index.ejs และปรับแก้ให้ถูกหลัก html


    < ul>
      <% article.forEach(function(data, i, arr){ -%>
      < li><%= data.title %></ li>
      <? }); -?>
    </ ul>


ดูผลลัพธ์

----

#### 8.	ทดลองการใช้ Include เพื่อเรียก header มาใช้งาน

สร้างไฟล์ views/header.ejs ขึ้นมา นำโค้ดในบรรทัดแรกจนถึง </ head> ไปไว้ในไฟล์ header.ejs 
และลบส่วนเดียวกันออกจากไฟล์ index.ejs และแทนที่ด้วย <%- include('header') -%>

----

#### 9.	ทดลองการดึง static file

ดาวน์โหลดไฟล์ที่กำหนดในใน /css ลงในโปรเจค 

ทดลองเรียกใช้ css ให้เปิดไฟล์ header.ejs และเพิ่มโค้ดเรียก 

<link rel='stylesheet' href='css/bulma.css' />

----

#### [โจทย์] 10. ให้นักศึกษาสร้างหน้าเว็บบล็อกหน้าแรก และหน้าแสดงข้อมูลแต่ละบทความ โดยแสดงข้อมูลบทความนั้น ๆ โดยใช้ id

มีข้อกำหนดดังนี้
- หน้าแรกแสดงผ่าน path /
- หน้าบทความแสดงผ่าน path /blog/id
- กรณีเข้าหน้า /blog โดยไม่ระบุ id ให้แสดง Error

แสดงผลลัพธ์ได้ตามตัวอย่าง

![ภาพแสดงหน้ารวมบทความ](screenshot/q10-1.png)
![ภาพแสดงหน้าข้อมูลแต่ละบทความ](screenshot/q10-2.png)

----

#### [โจทย์] 11. ทำช่อง Search (Query String)

แสดงผลลัพธ์ได้ตามตัวอย่าง

![ภาพแสดงตัวอย่างการค้นหา](screenshot/q11.png)

----

#### [โจทย์] 12. Comment บทความได้ (ในรูปแบบ Anonymous)

แสดงผลลัพธ์ได้ตามตัวอย่าง

![ภาพแสดงตัวอย่างการคอมเม้นต์](screenshot/q12.png)