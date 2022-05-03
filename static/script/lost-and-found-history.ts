(async (win, doc, tools) => {
    const oWrapper = doc.getElementById("J_wrapper") as HTMLDivElement,
        oList = doc.getElementById("J_list") as HTMLDivElement;

    const init = async () => {
        tools.createHeader(oWrapper, "我丢失的物品");

        const data = await fetchData();
        if (!data) return;

        render(data);
    }
    //<svg t="1651588654219" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="28698" width="20" height="20"><path d="M536.953154 464.455014m-448.014129 0a448.014129 448.014129 0 1 0 896.028258 0 448.014129 448.014129 0 1 0-896.028258 0Z" fill="#FFE585" p-id="28699" data-spm-anchor-id="a313x.7781069.0.i15"></path><path d="M547.508202 24.443486c-4.200646 0-8.421844 0.078094-12.593718 0.193181 223.698798 6.374953 403.064748 189.699047 403.064748 414.939177 0 229.268148-185.8601 415.132358-415.132358 415.132358-229.255817 0-415.132358-185.86421-415.132358-415.132358 0-36.104184 4.619889-71.143822 13.284236-104.5517-13.958312 43.305292-21.504678 89.483629-21.504679 137.433471 0 247.427106 200.599354 448.014129 448.014129 448.014129 247.431216 0 448.014129-200.587023 448.014129-448.014129 0-247.431216-200.582913-448.014129-448.014129-448.014129z" fill="#FF9900" opacity=".24" p-id="28700"></path><path d="M437.757071 1024h197.290626a16.440885 16.440885 0 0 0 0-32.881771h-197.290626a16.440885 16.440885 0 0 0 0 32.881771z" fill="#6E6E96" opacity=".29" p-id="28701"></path><path d="M708.480912 1024h57.543099a16.440885 16.440885 0 0 0 0-32.881771h-57.543099a16.440885 16.440885 0 0 0 0 32.881771zM359.112096 991.118229h-45.212435a16.440885 16.440885 0 0 0 0 32.881771h45.212435a16.440885 16.440885 0 0 0 0-32.881771z" fill="#6E6E96" opacity=".17" p-id="28702"></path><path d="M125.931017 487.061232c0-234.948474 190.459438-425.407911 425.407912-425.407912 229.851799 0 417.092934 182.300648 425.107865 410.187762 0.18085-5.182989 0.300046-10.378309 0.300046-15.60651 0-247.427106-200.599354-448.014129-448.014129-448.014129-247.431216 0-448.014129 200.587023-448.014129 448.014129 0 205.954972 138.983025 379.435085 328.308042 431.819856-164.955514-58.558324-283.095607-215.955141-283.095607-400.993196z" fill="#FFEFB5" p-id="28703"></path><path d="M244.531455 452.979276c-4.151324 144.252329 45.985157 270.925241 166.768122 304.933213 120.778855 34.007972 274.945038-35.121842 346.688951-160.331515L244.531455 452.979276z" fill="#C7A17B" p-id="28704"></path><path d="M228.09468 452.506601c-4.841841 168.264242 61.982138 288.35258 178.749417 321.234351 129.956979 36.593301 290.465234-37.189283 365.406899-167.984748a16.449106 16.449106 0 0 0-9.815208-23.999582l-513.448853-144.601698a16.436775 16.436775 0 0 0-20.892255 15.351677z m515.62727 136.903253c-66.66368 116.348036-213.789054 184.836655-327.962783 152.678283-146.019724-41.114544-156.89537-215.544119-154.790937-288.636185a16.453216 16.453216 0 0 1-20.892255 15.351677l513.457073 144.605808a16.444996 16.444996 0 0 1-9.811098-23.999583z" fill="#6E6E96" p-id="28705"></path><path d="M313.065286 97.954796C381.340173 55.385233 460.182439 32.881771 541.063375 32.881771c115.275268 0 223.649475 44.891838 305.163386 126.405748 81.51802 81.51391 126.409858 189.892227 126.409858 305.167495 0 237.969486-193.607867 431.573243-431.573244 431.573244-237.969486 0-431.573243-193.603757-431.573243-431.573244 0-51.965529 9.132912-102.767865 27.139792-151.005422a16.440885 16.440885 0 0 0-30.80611-11.49629C86.44001 353.877729 76.608361 408.551894 76.608361 464.455014c0 256.107893 208.347121 464.455014 464.455014 464.455015 256.103783 0 464.455014-208.347121 464.455015-464.455015 0-124.058811-48.315652-240.694563-136.044217-328.419017C781.753828 48.311542 665.122187 0 541.063375 0 454.025328 0 369.165697 24.225645 295.666719 70.054613a16.440885 16.440885 0 0 0 17.398567 27.900183z" fill="#6E6E96" p-id="28706"></path><path d="M451.727714 273.078997m-36.991992 0a36.991992 36.991992 0 1 0 73.983984 0 36.991992 36.991992 0 1 0-73.983984 0Z" fill="#6E6E96" p-id="28707"></path><path d="M711.016919 341.049728m-36.991993 0a36.991992 36.991992 0 1 0 73.983985 0 36.991992 36.991992 0 1 0-73.983985 0Z" fill="#6E6E96" p-id="28708"></path><path d="M219.37279 277.008369c9.342533-28.442732 38.393578-63.326181 64.682553-77.646192l0.098646-0.061653c26.420503-14.274799 26.420503-37.579754 0-51.821671l-0.098646-0.086315C257.762257 133.13829 227.190431 101.0128 216.117495 76.039095c-11.052385-25.014807-29.174351-25.014807-40.255509 0-11.035944 25.006587-41.636542 57.115636-68.052935 71.349333l-0.123306 0.098645c-26.342409 14.254248-26.342409 37.542762 0 51.829892l0.123306 0.049322c26.416393 14.258358 55.393453 49.19524 64.662003 77.637972l6.658558 20.123644c9.301431 28.467393 24.32018 28.467393 33.679154 0l6.564024-20.119534z" fill="#CFD3FF" p-id="28709"></path><path d="M234.991631 282.137925c8.101246-24.648998 34.16827-55.944223 56.930676-68.33654l0.300046-0.164409 0.291826-0.17674-0.542549 0.304157c18.080864-9.765886 28.446842-24.492809 28.438621-40.403476-0.00411-15.902446-10.374199-30.608819-28.450952-40.358264l3.058005 2.129095-1.393365-1.224846a48.891083 48.891083 0 0 0-1.730403-0.974123c-23.235081-12.593718-51.048949-41.702306-60.744962-63.560463-10.970181-24.821627-26.724659-28.533157-35.138282-28.537267s-24.172212 3.699199-35.183495 28.541377c-9.65902 21.882819-37.50577 50.970855-60.818946 63.535802l-1.331712 0.719289-1.183743 0.953571 2.371597-1.561884c-18.023321 9.753555-28.360527 24.455817-28.368747 40.341823-0.00822 15.894226 10.328986 30.617039 28.352307 40.399366l0.92891 0.501447 0.982342 0.37814-1.755064-0.817934c22.750075 12.277231 48.784217 43.539575 56.848472 68.266667l6.679109 20.193517c8.799984 26.938391 22.47469 32.618717 32.400875 32.626938s23.625552-5.647444 32.507741-32.655709l6.551693-20.119534z m-37.793485 9.860421c-2.947029 8.956172-5.478925 11.278447-5.507697 11.298999 1.878371-1.66464 6.666779-1.656419 8.54104 0.00822-0.028772-0.020551-2.548337-2.338716-5.466594-11.278447l-6.67911-20.185297c-10.604371-32.520071-42.446256-70.73691-72.471423-86.939403l-0.908359-0.493226-0.965902-0.37403 1.783836 0.834375c-7.706665-4.180095-11.155141-8.779433-11.155141-11.479849 0-2.696305 3.444366-7.279202 11.1387-11.438746l1.323491-0.715178 1.171413-0.945351-2.396259 1.574215c29.692239-16.001092 62.76308-50.781785 75.291035-79.187525 3.34983-7.562807 6.198214-9.145243 6.226986-9.157573a3.312838 3.312838 0 0 1-2.268843 0c0.028772 0.012331 2.868935 1.594766 6.218765 9.169903 12.585498 28.372858 45.590575 63.13711 75.143067 79.158754l-3.021012-2.112654 1.409806 1.237177c0.094535 0.086315 1.750954 0.978233 1.750954 0.978232 7.718996 4.159544 11.175692 8.738331 11.175692 11.426416 0 2.696305-3.456696 7.283312-11.188023 11.459297l-0.324707 0.172629-0.320598 0.18907 0.497337-0.279495c-29.963514 16.317579-61.780737 54.509756-72.442651 86.951733l-6.555803 20.127754z" fill="#6E6E96" p-id="28710"></path><path d="M260.791491 594.53119s251.730508-113.355795 386.081313 118.867602c0 0 111.115724-89.820668 111.115724-115.809597L244.531455 452.979276s-29.030494 96.269605 16.260036 141.551914z" fill="#6E6E96" opacity=".25" p-id="28711"></path></svg>
    //<svg t="1651588706932" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="30816" width="20" height="20"><path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#FBD971" p-id="30817"></path><path d="M243.809524 828.952381c0-148.114286 120.07619-268.190476 268.190476-268.190476s268.190476 120.07619 268.190476 268.190476" fill="#C03A2B" p-id="30818"></path><path d="M243.809524 828.952381c0-67.31581 120.07619-121.904762 268.190476-121.904762s268.190476 54.588952 268.190476 121.904762" fill="#E64C3C" p-id="30819"></path><path d="M780.166095 512a24.30781 24.30781 0 0 1-15.603809-5.656381l-146.285715-121.904762a24.429714 24.429714 0 0 1 0-37.449143l146.285715-121.904762a24.380952 24.380952 0 0 1 31.232 37.449143L672.01219 365.714286l123.806477 103.18019A24.380952 24.380952 0 0 1 780.166095 512zM243.833905 512a24.380952 24.380952 0 0 1-15.652572-43.105524L352.01219 365.714286 228.205714 262.534095a24.380952 24.380952 0 1 1 31.207619-37.449143l146.285715 121.904762a24.380952 24.380952 0 0 1 0.024381 37.449143l-146.285715 121.904762a24.30781 24.30781 0 0 1-15.603809 5.656381z" fill="#F29C1F" p-id="30820"></path></svg>
    const fetchData = async () => {
        tools.showInitLoading(oWrapper);
        try {
            const openid = tools.getOpenid();
            const response = await fetch(`/api/laf/by-user?openid=${openid}&start=0&limit=10`);
            const {code, data} = await response.json();
            if (code != 10000) {
                tools.showAlert(oWrapper, "获取数据失败，请稍后再试!", false);
                return;
            }
            return data.items;
        } catch (e) {
            tools.showAlert(oWrapper, "获取数据失败，请稍后再试!", false);
        } finally {
            tools.hideInitLoading();
            tools.hideAlert();
            oList.style.display = "block";
        }
    }

    const render = (data: API.LostAndFound[]) => {
        if (!data || data.length == 0) {
            tools.showNoData(oWrapper);
            return;
        }
        data.forEach(item => {
            const div = doc.createElement("div");
            div.innerHTML = `
                <h4 class="weui-media-box__title">${item.itemName}</h4>
                <p class="weui-media-box__desc">${substrAndEllipsis(item.description!, 20)}</p>
                <div class="tag">
                    ${item.status ? (
                `<svg t="1651588654219" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="28698" width="30" height="30"><path d="M536.953154 464.455014m-448.014129 0a448.014129 448.014129 0 1 0 896.028258 0 448.014129 448.014129 0 1 0-896.028258 0Z" fill="#FFE585" p-id="28699" data-spm-anchor-id="a313x.7781069.0.i15"></path><path d="M547.508202 24.443486c-4.200646 0-8.421844 0.078094-12.593718 0.193181 223.698798 6.374953 403.064748 189.699047 403.064748 414.939177 0 229.268148-185.8601 415.132358-415.132358 415.132358-229.255817 0-415.132358-185.86421-415.132358-415.132358 0-36.104184 4.619889-71.143822 13.284236-104.5517-13.958312 43.305292-21.504678 89.483629-21.504679 137.433471 0 247.427106 200.599354 448.014129 448.014129 448.014129 247.431216 0 448.014129-200.587023 448.014129-448.014129 0-247.431216-200.582913-448.014129-448.014129-448.014129z" fill="#FF9900" opacity=".24" p-id="28700"></path><path d="M437.757071 1024h197.290626a16.440885 16.440885 0 0 0 0-32.881771h-197.290626a16.440885 16.440885 0 0 0 0 32.881771z" fill="#6E6E96" opacity=".29" p-id="28701"></path><path d="M708.480912 1024h57.543099a16.440885 16.440885 0 0 0 0-32.881771h-57.543099a16.440885 16.440885 0 0 0 0 32.881771zM359.112096 991.118229h-45.212435a16.440885 16.440885 0 0 0 0 32.881771h45.212435a16.440885 16.440885 0 0 0 0-32.881771z" fill="#6E6E96" opacity=".17" p-id="28702"></path><path d="M125.931017 487.061232c0-234.948474 190.459438-425.407911 425.407912-425.407912 229.851799 0 417.092934 182.300648 425.107865 410.187762 0.18085-5.182989 0.300046-10.378309 0.300046-15.60651 0-247.427106-200.599354-448.014129-448.014129-448.014129-247.431216 0-448.014129 200.587023-448.014129 448.014129 0 205.954972 138.983025 379.435085 328.308042 431.819856-164.955514-58.558324-283.095607-215.955141-283.095607-400.993196z" fill="#FFEFB5" p-id="28703"></path><path d="M244.531455 452.979276c-4.151324 144.252329 45.985157 270.925241 166.768122 304.933213 120.778855 34.007972 274.945038-35.121842 346.688951-160.331515L244.531455 452.979276z" fill="#C7A17B" p-id="28704"></path><path d="M228.09468 452.506601c-4.841841 168.264242 61.982138 288.35258 178.749417 321.234351 129.956979 36.593301 290.465234-37.189283 365.406899-167.984748a16.449106 16.449106 0 0 0-9.815208-23.999582l-513.448853-144.601698a16.436775 16.436775 0 0 0-20.892255 15.351677z m515.62727 136.903253c-66.66368 116.348036-213.789054 184.836655-327.962783 152.678283-146.019724-41.114544-156.89537-215.544119-154.790937-288.636185a16.453216 16.453216 0 0 1-20.892255 15.351677l513.457073 144.605808a16.444996 16.444996 0 0 1-9.811098-23.999583z" fill="#6E6E96" p-id="28705"></path><path d="M313.065286 97.954796C381.340173 55.385233 460.182439 32.881771 541.063375 32.881771c115.275268 0 223.649475 44.891838 305.163386 126.405748 81.51802 81.51391 126.409858 189.892227 126.409858 305.167495 0 237.969486-193.607867 431.573243-431.573244 431.573244-237.969486 0-431.573243-193.603757-431.573243-431.573244 0-51.965529 9.132912-102.767865 27.139792-151.005422a16.440885 16.440885 0 0 0-30.80611-11.49629C86.44001 353.877729 76.608361 408.551894 76.608361 464.455014c0 256.107893 208.347121 464.455014 464.455014 464.455015 256.103783 0 464.455014-208.347121 464.455015-464.455015 0-124.058811-48.315652-240.694563-136.044217-328.419017C781.753828 48.311542 665.122187 0 541.063375 0 454.025328 0 369.165697 24.225645 295.666719 70.054613a16.440885 16.440885 0 0 0 17.398567 27.900183z" fill="#6E6E96" p-id="28706"></path><path d="M451.727714 273.078997m-36.991992 0a36.991992 36.991992 0 1 0 73.983984 0 36.991992 36.991992 0 1 0-73.983984 0Z" fill="#6E6E96" p-id="28707"></path><path d="M711.016919 341.049728m-36.991993 0a36.991992 36.991992 0 1 0 73.983985 0 36.991992 36.991992 0 1 0-73.983985 0Z" fill="#6E6E96" p-id="28708"></path><path d="M219.37279 277.008369c9.342533-28.442732 38.393578-63.326181 64.682553-77.646192l0.098646-0.061653c26.420503-14.274799 26.420503-37.579754 0-51.821671l-0.098646-0.086315C257.762257 133.13829 227.190431 101.0128 216.117495 76.039095c-11.052385-25.014807-29.174351-25.014807-40.255509 0-11.035944 25.006587-41.636542 57.115636-68.052935 71.349333l-0.123306 0.098645c-26.342409 14.254248-26.342409 37.542762 0 51.829892l0.123306 0.049322c26.416393 14.258358 55.393453 49.19524 64.662003 77.637972l6.658558 20.123644c9.301431 28.467393 24.32018 28.467393 33.679154 0l6.564024-20.119534z" fill="#CFD3FF" p-id="28709"></path><path d="M234.991631 282.137925c8.101246-24.648998 34.16827-55.944223 56.930676-68.33654l0.300046-0.164409 0.291826-0.17674-0.542549 0.304157c18.080864-9.765886 28.446842-24.492809 28.438621-40.403476-0.00411-15.902446-10.374199-30.608819-28.450952-40.358264l3.058005 2.129095-1.393365-1.224846a48.891083 48.891083 0 0 0-1.730403-0.974123c-23.235081-12.593718-51.048949-41.702306-60.744962-63.560463-10.970181-24.821627-26.724659-28.533157-35.138282-28.537267s-24.172212 3.699199-35.183495 28.541377c-9.65902 21.882819-37.50577 50.970855-60.818946 63.535802l-1.331712 0.719289-1.183743 0.953571 2.371597-1.561884c-18.023321 9.753555-28.360527 24.455817-28.368747 40.341823-0.00822 15.894226 10.328986 30.617039 28.352307 40.399366l0.92891 0.501447 0.982342 0.37814-1.755064-0.817934c22.750075 12.277231 48.784217 43.539575 56.848472 68.266667l6.679109 20.193517c8.799984 26.938391 22.47469 32.618717 32.400875 32.626938s23.625552-5.647444 32.507741-32.655709l6.551693-20.119534z m-37.793485 9.860421c-2.947029 8.956172-5.478925 11.278447-5.507697 11.298999 1.878371-1.66464 6.666779-1.656419 8.54104 0.00822-0.028772-0.020551-2.548337-2.338716-5.466594-11.278447l-6.67911-20.185297c-10.604371-32.520071-42.446256-70.73691-72.471423-86.939403l-0.908359-0.493226-0.965902-0.37403 1.783836 0.834375c-7.706665-4.180095-11.155141-8.779433-11.155141-11.479849 0-2.696305 3.444366-7.279202 11.1387-11.438746l1.323491-0.715178 1.171413-0.945351-2.396259 1.574215c29.692239-16.001092 62.76308-50.781785 75.291035-79.187525 3.34983-7.562807 6.198214-9.145243 6.226986-9.157573a3.312838 3.312838 0 0 1-2.268843 0c0.028772 0.012331 2.868935 1.594766 6.218765 9.169903 12.585498 28.372858 45.590575 63.13711 75.143067 79.158754l-3.021012-2.112654 1.409806 1.237177c0.094535 0.086315 1.750954 0.978233 1.750954 0.978232 7.718996 4.159544 11.175692 8.738331 11.175692 11.426416 0 2.696305-3.456696 7.283312-11.188023 11.459297l-0.324707 0.172629-0.320598 0.18907 0.497337-0.279495c-29.963514 16.317579-61.780737 54.509756-72.442651 86.951733l-6.555803 20.127754z" fill="#6E6E96" p-id="28710"></path><path d="M260.791491 594.53119s251.730508-113.355795 386.081313 118.867602c0 0 111.115724-89.820668 111.115724-115.809597L244.531455 452.979276s-29.030494 96.269605 16.260036 141.551914z" fill="#6E6E96" opacity=".25" p-id="28711"></path></svg>`
            ) : (
                `<svg t="1651589171762" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1225" width="30" height="30"><path d="M536.953154 464.455014m-448.014129 0a448.014129 448.014129 0 1 0 896.028258 0 448.014129 448.014129 0 1 0-896.028258 0Z" fill="#FFE585" p-id="1226"></path><path d="M547.508202 24.443486c-4.204756 0-8.421844 0.073984-12.597828 0.189071 223.698798 6.374953 403.068858 189.703157 403.068858 414.943287 0 229.268148-185.8601 415.132358-415.132358 415.132358-229.259927 0-415.132358-185.86421-415.132358-415.132358 0-36.108295 4.619889-71.143822 13.284236-104.5517-13.958312 43.305292-21.504678 89.483629-21.504679 137.433471 0 247.427106 200.595244 448.014129 448.014129 448.014129 247.431216 0 448.014129-200.587023 448.014129-448.014129 0-247.431216-200.582913-448.014129-448.014129-448.014129z" fill="#FF9900" opacity=".24" p-id="1227"></path><path d="M437.757071 1024h197.290626a16.440885 16.440885 0 0 0 0-32.881771h-197.290626a16.440885 16.440885 0 0 0 0 32.881771z" fill="#6E6E96" opacity=".29" p-id="1228"></path><path d="M708.480912 1024h57.543099a16.440885 16.440885 0 0 0 0-32.881771h-57.543099a16.440885 16.440885 0 0 0 0 32.881771zM359.112096 991.118229h-45.212435a16.440885 16.440885 0 0 0 0 32.881771h45.212435a16.440885 16.440885 0 0 0 0-32.881771z" fill="#6E6E96" opacity=".17" p-id="1229"></path><path d="M125.931017 487.061232c0-234.948474 190.459438-425.407911 425.407912-425.407912 229.851799 0 451.487266 147.898095 425.107865 410.187762 0.18085-5.182989 0.300046-10.378309 0.300046-15.60651 0-247.427106-200.595244-448.014129-448.014129-448.014129-247.431216 0-448.014129 200.587023-448.014129 448.014129 0 205.963193 138.987135 379.443306 328.308042 431.819856-164.955514-58.558324-283.095607-215.955141-283.095607-400.993196z" fill="#FFEFB5" p-id="1230"></path><path d="M802.103534 804.990965C725.731511 864.548072 634.040693 896.028258 536.953154 896.028258c-217.24164 0-401.342565-162.292091-428.227523-377.511502-1.12209-9.009605-9.338423-15.400999-18.352139-14.274799a16.440885 16.440885 0 0 0-14.274799 18.352139C105.038762 754.233841 303.163763 928.910029 536.953154 928.910029c104.485937 0 203.168242-33.884665 285.372669-97.991788a16.440885 16.440885 0 1 0-20.222289-25.927276zM966.195902 419.26313c1.549553 14.920104 2.334606 30.123812 2.334606 45.195995 0 25.598459-2.260622 51.24213-6.711992 76.219945a16.440885 16.440885 0 0 0 32.367993 5.778971 468.380276 468.380276 0 0 0 7.225769-81.990696c0-16.198382-0.846706-32.548843-2.511345-48.595147a16.440885 16.440885 0 0 0-32.705031 3.390932zM162.092745 250.435788C238.8799 116.245281 382.519807 32.881771 536.953154 32.881771c133.434226 0 257.262866 60.284617 339.726237 165.391197a16.440885 16.440885 0 0 0 25.865623-20.296273C813.809445 64.867514 680.556068 0 536.953154 0 370.756353 0 216.179148 89.705581 133.555478 234.105878a16.440885 16.440885 0 0 0 28.537267 16.32991z" fill="#6E6E96" p-id="1231"></path><path d="M193.975732 288.471776s-245.762466 63.67966-152.612519 155.247172c93.145837 91.559291 152.612519-155.247171 152.612519-155.247172z" fill="#89E0F5" p-id="1232"></path><path d="M189.85318 272.556999C172.988942 276.926165 24.556518 317.263877 5.859121 387.067766c-4.336284 16.181942-3.690979 41.180308 23.974921 68.377643 27.66179 27.193225 52.664266 27.406956 68.768113 22.799398 69.475072-19.885251 107.268557-168.987641 111.345897-185.921753 1.352263-5.614562-0.341148-11.529171-4.45548-15.577739s-10.049491-5.639224-15.639392-4.188316z m-136.964907 159.439597c-19.794826-19.466008-16.387453-32.220025-15.265362-36.412451 10.370089-38.771718 103.939278-76.511771 160.479483-91.197592a16.440885 16.440885 0 0 1-20.111313-19.766054c-13.711698 56.778598-49.848765 150.980761-88.439633 162.012596-4.167764 1.191964-16.864238 4.8254-36.663175-14.636499z" fill="#6E6E96" p-id="1233"></path><path d="M881.241736 534.756241s222.646581 217.948598 67.555599 258.491821c-155.090983 40.526783-67.555598-258.491822-67.555599-258.491821z" fill="#89E0F5" p-id="1234"></path><path d="M869.741337 546.507363c-0.00411 0 0 0 0 0 37.259157 36.515207 130.766693 143.405623 116.060321 198.745644-4.097891 15.421551-17.562976 25.914946-41.172088 32.084388s-40.48568 3.604664-51.603829-7.846412c-35.479431-36.527537-16.383342-160.532916 3.986915-230.106633a16.436775 16.436775 0 0 1-27.271319 7.123013z m83.211432 262.647256c35.578076-9.305541 57.325257-27.970056 64.633231-55.467437 22.219857-83.667666-109.722359-215.872936-124.843864-230.673844a16.453216 16.453216 0 0 0-15.659944-4.159544 16.399783 16.399783 0 0 0-11.619595 11.286668c-5.94338 20.300383-56.330584 200.15545 3.986914 262.265005 19.823598 20.411359 47.921071 26.046473 83.503258 16.749152z" fill="#6E6E96" p-id="1235"></path><path d="M640.982857 708.133598c-66.951396 72.105613-65.060694-65.011371-193.65308-101.403271-138.785735-39.277275-194.084653 84.391065-206.329002-9.708343-11.282558-86.659907 122.990154-166.328328 251.689405-130.581733 138.608995 38.508664 207.755249 177.651988 148.292677 241.693347z" fill="#C7A17B" p-id="1236"></path><path d="M628.931688 696.949686c-13.123937 14.130941-19.815377 15.466763-22.08422 15.380448-7.439501-0.275385-19.322151-15.174937-30.82255-29.581263-24.661328-30.904754-58.435017-73.215373-124.22322-91.838786-75.097855-21.249844-127.227792 1.455018-161.72899 16.490208-9.868641 4.295181-23.378939 10.185129-27.238437 9.358974a1.759175 1.759175 0 0 1 0.620643 0.308267c-0.152078-0.131527-3.732081-3.510129-6.161222-22.178755-3.300508-25.335404 9.10003-51.628491 34.920441-74.025087 40.432248-35.08485 116.738507-60.625765 196.074-38.590868 85.615911 23.785851 138.674759 86.491388 153.278375 138.086997 8.808204 31.130817 4.319843 58.328151-12.63482 76.589865z m-131.843571-246.346118c-91.082505-25.298413-179.349509 4.591117-226.423875 45.434387-34.414883 29.864868-50.748903 66.47872-45.976936 103.109014 2.342826 18.00688 6.835298 37.600305 22.351384 46.392068 16.432665 9.305541 34.846457 1.286499 56.166175-7.99438 32.014514-13.950091 75.858246-33.04207 139.644771-14.989978 55.627736 15.742148 84.374624 51.768238 107.478178 80.708307 17.595858 22.047227 32.795456 41.093993 55.290698 41.928368 20.267502 0.764501 36.75771-14.398105 47.407293-25.865623 25.06824-26.987713 32.232356-65.315528 20.172967-107.905641-17.094411-60.449026-78.184631-133.615076-176.110655-160.816522zM758.703707 353.298188c-0.727509-1.812608-18.232942-44.513697-58.49256-56.531985-25.845072-7.714886-53.963096-1.138531-83.581352 19.548213a16.440885 16.440885 0 0 0 18.833034 26.958942c20.900476-14.603617 39.466346-19.663299 55.175612-15.047521 24.998366 7.349076 37.444117 37.061866 37.571534 37.361913l-0.028772-0.061654a16.440885 16.440885 0 1 0 30.522504-12.227908z" fill="#6E6E96" p-id="1237"></path><path d="M491.046091 268.86191c-0.727509-1.812608-18.228832-44.513697-58.484339-56.536095-25.849182-7.714886-53.971317-1.138531-83.589572 19.548213a16.440885 16.440885 0 0 0 18.828924 26.958942c20.97857-14.652939 39.601983-19.700291 55.352351-14.998198 24.813406 7.410729 37.250936 36.95089 37.370133 37.246826a16.440885 16.440885 0 1 0 30.522503-12.219688z" fill="#6E6E96" p-id="1238"></path><path d="M355.811588 532.549052s123.306641-67.818653 234.282618 67.818652l39.939021-39.939021c-29.075706-40.810388-76.511771-77.087202-137.338937-93.988432-56.223718-15.614731-113.499653-9.202786-159.250527 10.189239l22.367825 55.919562z" fill="#FFFFFF" p-id="1239"></path><path d="M363.736095 546.955378l-0.053433 0.028771c4.574676-2.474353 113.154394-59.080322 213.690409 63.794746a16.473767 16.473767 0 0 0 11.903201 6.005033 16.408004 16.408004 0 0 0 12.44164-4.792518l39.939021-39.939021a16.440885 16.440885 0 0 0 1.767395-21.16764c-34.16416-47.941622-86.133799-83.55669-146.327991-100.281181-56.25249-15.618841-116.643972-11.751123-170.068629 10.892087a16.440885 16.440885 0 0 0-8.849307 21.241624l22.367825 55.915451a16.449106 16.449106 0 0 0 23.189869 8.302648z m-23.876276-55.187943c45.931724-19.466008 100.034568-22.922705 148.436534-9.48228 52.960202 14.714592 98.542557 45.85363 128.349883 87.683352a16.424445 16.424445 0 0 1 1.767395-21.15942l-39.939021 39.939021a16.399783 16.399783 0 0 1 12.44164-4.800738 16.469657 16.469657 0 0 1 11.903201 6.013254c-118.263399-144.548265-253.571887-72.553628-254.924149-71.817898a16.449106 16.449106 0 0 1 23.181648 8.298537l-22.367824-55.919562a16.444996 16.444996 0 0 1-8.849307 21.245734z" fill="#6E6E96" p-id="1240"></path><path d="M827.537584 254.619993s90.568728 162.111241 138.119879 79.245068c47.53471-82.862063-138.119879-79.245068-138.119879-79.245068z" fill="#89E0F5" p-id="1241"></path><path d="M813.180581 262.634925c10.349537 18.524768 64.715435 110.943095 118.933365 111.255472 13.428093 0.078094 32.622827-5.3885 47.797765-31.845995 15.174937-26.457495 10.20568-45.779646 3.366271-57.333478-27.633018-46.646902-134.856363-46.946948-156.065105-46.531816a16.465547 16.465547 0 0 0-13.945982 8.253324 16.449106 16.449106 0 0 0-0.086314 16.202493z m138.206193 63.046685c-8.824645 15.384559-16.547751 15.339346-19.091978 15.327016-26.067024-0.147968-68.562603-55.298918-90.412539-94.407675a16.432665 16.432665 0 0 1-14.032296 24.451707c44.813744-0.838485 113.890124 8.043703 127.137367 30.419749 1.29472 2.186638 5.228202 8.828755-3.600554 24.209203z" fill="#6E6E96" p-id="1242"></path></svg>`
            )}
                </div>
           `;
            div.className = "weui-media-box weui-media-box_text";
            div.addEventListener("click", () => {
                win.location.href = `lost-and-found-detail.html?id=${item.id}&type=history`;
            });
            oList.appendChild(div);
        });
    }

    const substrAndEllipsis = (str: string, length: number) => {
        return str?.length < length ? str : str?.substring(0, length) + "...";
    };

    await init();
})(window, document, tools);