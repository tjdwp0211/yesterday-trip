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
              <label
                class="custom-label-container"
                v-for="sido in selectOptions.sido"
                :key="sido.id"
                :for="`sido-${sido.id}`"
              >
                <input
                  type="radio"
                  :id="`sido-${sido.id}`"
                  name="sido"
                  :value="sido.id"
                  @input="handleSidoSelectValue"
                />
                <span
                  :class="`label-name-${sido.id}`"
                  :style="`${selectValues.sido} label-name-${sido.id}{ color: white }`"
                  >{{ sido.name }}</span
                >
                <span class="checkmark"></span>
              </label>
            </div>
          </div>
          <div class="select-container inner">
            <h2>자세한 위치도 알려주세요</h2>
            <div class="gugun-container">
              <label
                class="custom-label-container"
                v-for="gugun in selectOptions.gugun"
                :key="gugun?.id"
                :for="`gugun-${gugun?.id}`"
              >
                <input
                  type="radio"
                  :id="`gugun-${gugun.id}`"
                  name="gugun"
                  :value="gugun.id"
                  @input="handleGugunSelectValue"
                />
                <span class="label-name">{{ gugun.name }}</span>
                <span class="checkmark"></span>
              </label>
            </div>
          </div>
          <div class="select-container inner">
            <h2>어떤 추가할 정보는 종류인가요?</h2>
            <div class="content-type-container">
              <label
                v-for="contentType in selectOptions.contentType"
                :key="contentType.id"
                :for="`content-type-${contentType.id}`"
                class="custom-label-container"
              >
                <input
                  type="radio"
                  :id="`content-type-${contentType.id}`"
                  name="content-type"
                  :value="contentType.id"
                  @input="handleContentTypeSelectValue"
                />
                <span class="label-name">{{ contentType.name }}</span>
                <span class="checkmark"></span>
              </label>
            </div>
          </div>
          <div class="admin-input-container inner">
            <!-- <h2>마지막으로 정보들을 입력해주세요</h2> -->
            <div class="etc-infos-wrapper">
              <!-- <div> -->
              <label class="title-label">
                이름은 무엇인가요
                <BaseInput id="title" type="text" :value="keyboardValues.title" @handle-change="handleKeyboardValues" />
              </label>
              <!-- </div> -->
              <!-- <div> -->
              <label class="address-label">
                주소 입력 후 확인을 해주세요
                <BaseInput
                  id="address"
                  type="text"
                  :value="keyboardValues.address"
                  @handle-change="handleKeyboardValues"
                />
                <BaseButton
                  :background-color="PALETTE.MAIN_BLUE"
                  color="white"
                  width="72px"
                  height="24px"
                  class="check-adress-button"
                  type="button"
                  :sortCenter="true"
                  @click="handleRequestCheckAddress"
                  >주소 확인</BaseButton
                >
                <div v-if="addressCoordinate.latitude && addressCoordinate.longitude" class="checked-address">
                  주소 확인이 되었습니다!
                </div>
              </label>

              <!-- </div> -->
              <!-- <div> -->
              <label class="tel-label">
                전화번호를 입력해주세요
                <BaseInput id="tel" type="tel" :value="keyboardValues.tel" @handle-change="handleKeyboardValues" />
              </label>
              <!-- </div> -->
            </div>
            <BaseButton
              type="submit"
              :background-color="PALETTE.MAIN_BLUE"
              color="white"
              :sortCenter="true"
              width="84px"
              height="56px"
              class="add-attraction-submit-button"
            >
              작성
            </BaseButton>
          </div>
        </section>
      </div>
      <BaseButton
        class="prev-button"
        type="button"
        background-color="inherit"
        :sortCenter="true"
        :eventHandler="() => handleVisibles(false)"
      >
        <img src="../../assets/imgs/arrow-left.svg" width="24" height="24" />
      </BaseButton>
      <BaseButton
        class="next-button"
        type="button"
        background-color="inherit"
        :sortCenter="true"
        :eventHandler="() => handleVisibles(true)"
      >
        <img src="../../assets/imgs/arrow-right.svg" width="24" height="24" />
      </BaseButton>
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

import { useRouter } from "vue-router";

const selectOptions = reactive({ sido: [], gugun: [], contentType: [] });
const visibles = reactive({ curIndex: 0, views: [true, false] });
const selectValues = reactive({ sido: "", gugun: "", contentType: "" });
// const keyboardValues = reactive({ title: "", content: "", address: "", tel: "" });
const keyboardValues = reactive({ title: "", address: "", tel: "" });
const addressCoordinate = reactive({ latitude: 0.0, longitude: 0.0 });

const reouter = useRouter();

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
    keyword: keyboardValues.title,
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
    keyword: keyboardValues.title,
    address: keyboardValues.address,
    tel: keyboardValues.tel,
    latitude: addressCoordinate.latitude,
    longitude: addressCoordinate.longitude,
    mlevel: 6
  }).then((res) => {
    alert("등록이 완료 되었습니다!");
  });
};

onMounted(async () => {
  try {
    const [manageList, contentTypeList] = await Promise.all([requestMyTeamListForAdmin(), requsetContentType()]);
    selectOptions.sido = manageList.data;
    selectOptions.contentType = contentTypeList.data;
    console.log(`manageList.data :`, manageList.data);
    // reouter.push("/home");
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
