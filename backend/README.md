## 博客后端API

+ 登录


## API设计

路径|HTTP动词|说明
---|---|---
posts|GET|获取所有博文
posts/:title|GET|获取单篇博客信息
posts/:title|DELETE|删除单篇博客
posts|POST|新建博客
posts|PUT|更新博客
login|POST|登录信息

## 接口具体说明

### 获取所有博文

请求体

```
/posts?q=keyword
```


```
{
posts:[
  {
  title:""  // 物理文件名称
  }
    ]

}
total:100
```

### 获取单篇博文

posts/:title

```
{
content:""

}


```

### 删除单篇博客
posts/:title

```
{
status:"OK"
}

```

### 新建博客

请求体

```
{
title:""
}

```

返回体

```
{

title:""
}

```


### 更新单篇博客

请求体

```
{
title:"",
content:""
}



```

返回体
```
{

status:""

}

```

### 登录

请求体
```
{
username:"alan",
password:"123456"

}

```

返回体

```
{
token:"111111"
}

```
