# Frontend Structure

## Goal

Current muammo:

- `src/components` haddan tashqari katta
- feature va shared narsalar aralashib ketgan
- ko'p styled-component dublicate
- page/layout/dialog/panel lar bir xil skeletni qayta yozmoqda

Maqsad:

- feature bo'yicha ajratish
- shared UI va shared layoutlarni markazlashtirish
- import yo'llarini soddalashtirish
- katta fayllarni bo'lib tashlash

## Target Structure

```text
src/
  app/
    App.jsx
    main.jsx
    providers/

  features/
    arena/
      api/
      components/
      dialogs/
      hooks/
      utils/

    chats/
      api/
      components/
      hooks/

    courses/
      api/
      components/
      dialogs/

    meets/
      components/
      dialogs/
      store/

    posts/
      components/
      dialogs/

    profile/
      components/
      dialogs/
      ui/

  shared/
    api/
    ui/
    layout/
    hooks/
    utils/
    constants/

  contexts/
  store/
  styles/
```

## Migration Rules

1. `feature-specific` komponentlar `src/components`da qolmaydi.
2. 2+ joyda ishlatilgan UI primitive `shared/ui`ga chiqadi.
3. 2+ feature ishlatadigan layout skeleti `shared/layout`ga chiqadi.
4. Feature ichidagi dialoglar `dialogs/` papkasiga ajratiladi.
5. Katta faylda 3 xil responsibility bo'lsa bo'linadi:
   - layout
   - data/logic
   - item render

## Current Migration

Hozir refactor qilingan foundation:

- `features/profile/ui/ProfilePane.jsx`
  - profile right pane uchun shared skelet
  - header/body/section/empty state dublicatlarini kamaytiradi

- `components/arena/ShareLinksDialog.jsx`
  - test + gap tuzish share dialoglari uchun shared component

## Next Safe Refactors

1. `ProfilePage.jsx` ni bo'lish:
   - `ProfileSidebar`
   - `ProfilePostsPane`
   - `ProfileCoursesPane`

2. `UniversalDialog.jsx` ni `features/meets/dialogs/CreateMeetDialog.jsx`ga ko'chirish

3. `CoursePlayer.jsx` ichidagi shared player controls ni `features/courses/components/player/`ga ajratish

4. `ChatArea.jsx` ni:
   - header
   - message list
   - composer
   - attachments
   bo'lib tashlash

5. `src/components`ni faqat transitional layer sifatida qoldirish, keyin bosqichma-bosqich bo'shatish
