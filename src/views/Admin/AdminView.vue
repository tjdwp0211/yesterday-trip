<template>
  <main class="admin-page-wrapper">
    <form @submit.prevent="handleRequestCreateNewAttraction">
      <div class="form-wrapper">
        <section
          class="transition-wrapper"
          :style="{ left: `calc(${100 * visibles.curIndex}% + ${30 * visibles.curIndex}px)` }"
        >
          <div class="select-container inner">
            <h2>추가할 지역 정보를 알려주세요</h2>
            <div class="sido-container">
              <label v-for="sido in selectOptions.sido" :key="sido.id" :for="sido.id">
                <BaseInput
                  type="radio"
                  :id="sido.id"
                  :value="sido.id"
                  name="sido"
                  @handle-change="handleSidoSelectValue"
                />
                {{ sido.name }}
              </label>
            </div>
          </div>
          <div class="select-container inner">
            <h2>자세한 위치도 알려주세요</h2>
            <div class="gugun-container">
              <template v-if="selectOptions.gugun.length > 0">
                <label v-for="gugun in selectOptions.gugun" :key="gugun?.id" :for="gugun?.id">
                  <BaseInput
                    type="radio"
                    :id="gugun?.id"
                    :value="gugun?.id"
                    name="gugun"
                    @handle-change="handleGugunSelectValue"
                  />
                  {{ gugun?.name }}
                </label>
              </template>
            </div>
          </div>
          <div class="select-container inner">
            <h2>어떤 추가할 정보는 종류인가요?</h2>
            <div class="content-type-container">
              <label v-for="contentType in selectOptions.contentType" :key="contentType.id" :for="contentType.id">
                <BaseInput
                  type="radio"
                  :id="contentType.id"
                  :value="contentType.id"
                  name="content-type"
                  @handle-change="handleContentTypeSelectValue"
                />
                {{ contentType.name }}
              </label>
            </div>
          </div>
          <div class="input-container inner">
            <h2>인풋 뷰</h2>
            <div>
              <label
                >제목
                <BaseInput id="title" type="text" :value="keyboardValues.title" @handle-change="handleKeyboardValues" />
              </label>
            </div>
            <!-- <div>
              <label>
                컨텐츠
                <BaseInput
                  id="content"
                  type="text"
                  :value="keyboardValues.content"
                  @handle-change="handleKeyboardValues"
                ></BaseInput>
              </label>
            </div> -->
            <div>
              <label>
                주소
                <BaseInput
                  id="address"
                  type="text"
                  :value="keyboardValues.address"
                  @handle-change="handleKeyboardValues"
                />
              </label>
              <button type="button" @click="handleRequestCheckAddress">주소 확인</button>
            </div>
            <div>
              <label>
                전화번호
                <BaseInput id="tel" type="tel" :value="keyboardValues.tel" @handle-change="handleKeyboardValues" />
              </label>
            </div>
            <BaseButton
              type="submit"
              background-color="white"
              :color="PALETTE.MAIN_BLUE"
              :sortCenter="true"
              width="84px"
              height="56px"
            >
              작성
            </BaseButton>
          </div>
        </section>
      </div>
      <div class="buttons-wrapper">
        <BaseButton
          type="button"
          color="white"
          background-color="inherit"
          :sortCenter="true"
          :eventHandler="() => handleVisibles(false)"
        >
          <img src="../../assets/imgs/arrow-left.svg" width="24" height="24" />
        </BaseButton>
        <BaseButton
          type="button"
          color="white"
          background-color="inherit"
          :sortCenter="true"
          :eventHandler="() => handleVisibles(true)"
        >
          <img src="../../assets/imgs/arrow-right.svg" width="24" height="24" />
        </BaseButton>
      </div>
    </form>
  </main>
</template>

<script setup>
import { onMounted, reactive, watch } from "vue";
import BaseInput from "../../components/BaseInput/BaseInput.vue";
import BaseButton from "../../components/BaseButton/BaseButton.vue";
import { requestMyTeamListForAdmin, requestCheckAddress, requestCreateAttractionForAdmin } from "../../api/team";
import { requsetContentType, requsetGuGUn } from "../../api/region";
import { PALETTE } from "../../palette";

const selectOptions = reactive({ sido: [], gugun: [], contentType: [] });
const visibles = reactive({ curIndex: 0, views: [true, false] });
const selectValues = reactive({ sido: "", gugun: "", contentType: "" });
// const keyboardValues = reactive({ title: "", content: "", address: "", tel: "" });
const keyboardValues = reactive({ title: "", address: "", tel: "" });
const addressCoordinate = reactive({ latitude: 0.0, longitude: 0.0 });

const handleVisibles = (next) => {
  if ((!next && visibles.curIndex === 0) || (next && visibles.curIndex === -3)) {
    return;
  }
  if (next) {
    visibles.curIndex -= 1;
  } else {
    visibles.curIndex += 1;
  }
};

const handleSidoSelectValue = (e) => {
  selectValues.sido = e.target.value;
  handleVisibles(true);
  // keyboardValues.address += e.target.innerText;
};

const handleGugunSelectValue = (e) => {
  selectValues.gugun = e.target.value;
  handleVisibles(true);
  // keyboardValues.address += ` ${e.target.innerText}`;
};

const handleContentTypeSelectValue = (e) => {
  selectValues.contentType = e.target.value;
  handleVisibles(true);
};

const handleKeyboardValues = (e) => {
  keyboardValues[e.target.id] = e.target.value;
};

const handleRequestCheckAddress = async () => {
  const coordinate = await requestCheckAddress(keyboardValues.address).then((res) => res.data);
  addressCoordinate.latitude = coordinate.latitude;
  addressCoordinate.longitude = coordinate.longitude;
  console.log(`coordinate :`, coordinate);
};

const handleRequestCreateNewAttraction = async (e) => {
  e.preventDefault();

  console.log({
    teamId: selectValues.sido,
    contentTypeId: selectValues.contentType,
    sidoCode: selectValues.sido,
    gugunCode: selectValues.gugun,
    title: keyboardValues.title,
    address: keyboardValues.address,
    tel: keyboardValues.tel,
    latitude: addressCoordinate.latitude,
    longitude: addressCoordinate.longitude,
    mlevel: 6
  });
  await requestCreateAttractionForAdmin({
    teamId: selectValues.sido,
    contentTypeId: selectValues.contentType,
    sidoCode: selectValues.sido,
    gugunCode: selectValues.gugun,
    title: keyboardValues.title,
    address: keyboardValues.address,
    tel: keyboardValues.tel,
    latitude: addressCoordinate.latitude,
    longitude: addressCoordinate.longitude,
    mlevel: 6
  }).then((res) => {
    console.log(`res.data :`, res.data);
  });
};

const DUMMY = {
  contentId: "int",
  contentTypeId: "int",
  sidoCode: "int",
  gugunCode: "int",
  title: "string",
  address: "string",
  tel: "string"
  // zipcode: "string",
  // latitude: "double",
  // longitude: "double",
  // mlevel: ""
};

onMounted(async () => {
  try {
    const [manageList, contentTypeList] = await Promise.all([requestMyTeamListForAdmin(), requsetContentType()]);
    selectOptions.sido = manageList.data;
    selectOptions.contentType = contentTypeList.data;
    console.log(`manageList.data :`, manageList.data);
  } catch (err) {
    alert("알 수 없는 에러가 발생하였습니다.");
  }
});

watch(
  () => selectValues.sido,
  async () => {
    if (selectValues.sido) {
      await requsetGuGUn(selectValues.sido).then((res) => {
        selectOptions.gugun = res.data;
      });
    }
  }
);
</script>

<style lang="scss">
@import "./AdminView.scss";
</style>
