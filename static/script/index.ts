((win, doc, tools) => {
        // 添加一条访问记录
        const addOneUsageRecord = () => {
           const openid =  tools.getOpenid();
              if (openid) {
                  tools.post(`/api/visit`);
              }
        }

        addOneUsageRecord();
    }
)(window, document, tools);