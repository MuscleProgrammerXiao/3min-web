##### 登录接口
- 接口地址：/api/login
- 请求方法：POST
- 请求参数：
```json
    {
        "username": "admin",
        "password": "123456"
    }
```
- 响应参数：
```json
  {
    "code": 200,
    "msg": "登录成功",
    "data": {
        "userId": "123456",
        "username": "johndoe",
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "roles": [
            "ROLE_USER",
            "ROLE_ADMIN",
        ],  
        "expiresIn": 3600,
    }
  }
```
```
    响应参数说明：
    - code：状态码，200表示成功
    - msg：状态描述
    - data：登录成功后返回的数据
        - userId：用户ID
        - username：用户名
        - accessToken：访问令牌，用于后续请求的身份验证
        - refreshToken：刷新令牌，用于获取新的访问令牌
        - roles：用户角色列表
        - expiresIn：访问令牌的过期时间，单位为秒
```

##### 刷新用户信息接口
- 接口地址：/api/refresh
- 请求方法：POST
- 请求参数：
```json
    {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
```
- 响应参数：
```json
  {
    "code": 200,
    "msg": "刷新成功",
    "data": {
        "userId": "123456",
        "username": "johndoe",
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "roles": [
            "ROLE_USER",
            "ROLE_ADMIN",
        ],  
        "expiresIn": 3600,
    }
  }
```
```
    响应参数说明：
    - code：状态码，200表示成功
    - msg：状态描述
    - data：刷新成功后返回的数据
        - userId：用户ID
        - username：用户名
        - accessToken：新的访问令牌，用于后续请求的身份验证
        - refreshToken：刷新令牌，用于获取新的访问令牌
        - roles：用户角色列表
        - expiresIn：新的访问令牌的过期时间，单位为秒
``` 
##### 退出登录
- 接口地址：/api/logout
- 请求方法：POST
- 请求参数：
```json
    {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
```
- 响应参数：
```json
  {
    "code": 200,
    "msg": "退出成功",
    "data": null
  }
```
