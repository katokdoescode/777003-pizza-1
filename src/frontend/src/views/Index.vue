<template>
  <div id="constructor-page">
    <header class="header">
      <div class="header__logo">
        <a href="/" class="logo">
          <img
            src="@/assets/img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </a>
      </div>
      <div class="header__cart">
        <a href="cart.html">0 ₽</a>
      </div>
      <div class="header__user">
        <!-- Нет стилей для ссылки на вход :( -->
        <a href="#" class="header__login"><span>Войти</span></a>
      </div>
    </header>

    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <div class="content__dough">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите тесто</h2>

              <div class="sheet__content dough">
                <label
                  class="dough__input"
                  :class="getDoughSize(dough)"
                  v-for="(dough, key) in pizza.dough"
                  :key="'dough-' + key"
                >
                  <input
                    type="radio"
                    name="dought"
                    :value="dough.name"
                    v-model="order.dough"
                    class="visually-hidden"
                  />
                  <b>{{ dough.name }}</b>
                  <span>{{ dough.description }}</span>
                </label>
              </div>
            </div>
          </div>

          <div class="content__diameter">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите размер</h2>

              <div class="sheet__content diameter">
                <label
                  class="diameter__input"
                  :class="'diameter__input--' + getPizzaSize(size)"
                  v-for="(size, key) in pizza.sizes"
                  :key="'size-' + key"
                >
                  <input
                    type="radio"
                    name="diameter"
                    :value="size.multiplier"
                    v-model="order.size"
                    class="visually-hidden"
                  />
                  <span>{{ size.name }}</span>
                </label>
              </div>
            </div>
          </div>

          <div class="content__ingredients">
            <div class="sheet">
              <h2 class="title title--small sheet__title">
                Выберите ингредиенты
              </h2>

              <div class="sheet__content ingredients">
                <div class="ingredients__sauce">
                  <p>Основной соус:</p>

                  <label
                    class="radio ingredients__input"
                    v-for="(sauce, key) in pizza.sauces"
                    :key="'sauce-' + key"
                  >
                    <input
                      type="radio"
                      name="sauce"
                      :value="sauce.name"
                      v-model="order.sauce"
                    />
                    <span>{{ sauce.name }}</span>
                  </label>
                </div>

                <div class="ingredients__filling">
                  <p>Начинка:</p>

                  <ul class="ingredients__list">
                    <li
                      class="ingredients__item"
                      v-for="(ingredient, key) in pizza.ingredients"
                      :key="'ingredient-' + key"
                    >
                      <span
                        class="filling"
                        :class="getIngredientClass(ingredient)"
                      >
                        {{ ingredient.name }}
                      </span>

                      <div class="counter counter--orange ingredients__counter">
                        <button
                          type="button"
                          class="counter__button counter__button--minus"
                          disabled
                        >
                          <span class="visually-hidden">Меньше</span>
                        </button>
                        <input
                          type="text"
                          name="counter"
                          class="counter__input"
                          value="0"
                        />
                        <button
                          type="button"
                          class="counter__button counter__button--plus"
                        >
                          <span class="visually-hidden">Больше</span>
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="content__pizza">
            <label class="input">
              <span class="visually-hidden">Название пиццы</span>
              <input
                type="text"
                name="pizza_name"
                v-model="order.pizza_name"
                placeholder="Введите название пиццы"
              />
            </label>

            <div class="content__constructor">
              <div class="pizza pizza--foundation--big-tomato">
                <div class="pizza__wrapper">
                  <div class="pizza__filling pizza__filling--ananas"></div>
                  <div class="pizza__filling pizza__filling--bacon"></div>
                  <div class="pizza__filling pizza__filling--cheddar"></div>
                </div>
              </div>
            </div>

            <div class="content__result">
              <p>Итого: 0 ₽</p>
              <button type="button" class="button" disabled>Готовьте!</button>
            </div>
          </div>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import misc from "@/static/misc.json";
import pizza from "@/static/pizza.json";
import user from "@/static/user.json";

export default {
  name: "Constructor",
  data() {
    return {
      misc,
      pizza,
      user,
      order: {
        dough: null,
        sauce: null,
        pizza_name: null,
      },
    };
  },
  methods: {
    /*
      Не уверен насчет этих методов,
      но это лучшее что мне сейчас пришло в голову
      для сохранения классов.
    */
    getDoughSize(dough) {
      return "dough__input--" + (dough.name == "Тонкое" ? "light" : "large");
    },
    getPizzaSize(size) {
      switch (size.multiplier) {
        case 1:
          return "small";
        case 2:
          return "normal";
        case 3:
          return "big";
        default:
          break;
      }
    },
    getIngredientClass(ingredient) {
      const imagePath = ingredient.image.split("/");
      return imagePath[3] + "--" + imagePath[4].slice(0, -4);
    },
  },
};
</script>
<style></style>
