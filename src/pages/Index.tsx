import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import AuthModal from '@/components/AuthModal';

const pizzas = [
  {
    id: 1,
    name: 'Пепперони',
    description: 'Классическая пицца с пикантной колбасой пепперони, моцареллой и томатным соусом',
    price: 599,
    image: 'https://cdn.poehali.dev/projects/72d0d0a7-e3f0-40fc-9227-ac83d2d62238/files/7769edb4-95d6-414f-85e6-e36afdc2e1ad.jpg'
  },
  {
    id: 2,
    name: 'Цезарь',
    description: 'Нежная курица, сыр пармезан, салат айсберг и фирменный соус цезарь',
    price: 649,
    image: 'https://cdn.poehali.dev/projects/72d0d0a7-e3f0-40fc-9227-ac83d2d62238/files/9b24e157-4407-45bf-91e7-aa3b4f1ee096.jpg'
  },
  {
    id: 3,
    name: 'Тропическая',
    description: 'Экзотическое сочетание ананасов, ветчины, моцареллы на томатной основе',
    price: 579,
    image: 'https://cdn.poehali.dev/projects/72d0d0a7-e3f0-40fc-9227-ac83d2d62238/files/c98cc4c6-d153-49f3-8854-fed33d262e7a.jpg'
  }
];

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<{ phone: string; name: string } | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleAuthSuccess = (phone: string, name: string) => {
    const userData = { phone, name };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-4xl">🍕</div>
              <h1 className="text-2xl font-bold text-primary">ЖарПицца</h1>
            </div>
            <div className="hidden md:flex gap-6 items-center">
              {[
                { id: 'home', label: 'Главная' },
                { id: 'menu', label: 'Меню' },
                { id: 'about', label: 'О нас' },
                { id: 'promo', label: 'Акции' },
                { id: 'delivery', label: 'Доставка' },
                { id: 'contacts', label: 'Контакты' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === item.id ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="text-sm">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-xs text-muted-foreground">{user.phone}</div>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <Icon name="LogOut" size={16} className="mr-1" />
                    Выход
                  </Button>
                </div>
              ) : (
                <Button onClick={() => setIsAuthModalOpen(true)}>
                  <Icon name="User" size={16} className="mr-2" />
                  Войти
                </Button>
              )}
            </div>
          </div>
        </nav>
      </header>

      <section id="home" className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-background" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
              Самая жаркая пицца в Курганинске! 🔥
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Настоящий итальянский вкус с домашним теплом. Доставим горячей за 30 минут!
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6"
                onClick={() => scrollToSection('menu')}
              >
                Посмотреть меню
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6"
                onClick={() => scrollToSection('contacts')}
              >
                <Icon name="Phone" size={20} className="mr-2" />
                Позвонить
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Наше меню</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Только проверенные рецепты и свежие ингредиенты
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pizzas.map((pizza, index) => (
              <Card 
                key={pizza.id} 
                className="overflow-hidden hover:shadow-xl transition-shadow duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={pizza.image} 
                    alt={pizza.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{pizza.name}</h3>
                  <p className="text-muted-foreground mb-4">{pizza.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-primary">{pizza.price} ₽</span>
                    <Button size="lg">
                      Заказать
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-accent/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">О нас</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 animate-fade-in">
                <div className="text-5xl mb-4">👨‍🍳</div>
                <h3 className="text-xl font-bold mb-2">Опытные повара</h3>
                <p className="text-muted-foreground">15 лет опыта в приготовлении настоящей итальянской пиццы</p>
              </div>
              <div className="text-center p-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="text-5xl mb-4">🌾</div>
                <h3 className="text-xl font-bold mb-2">Свежие продукты</h3>
                <p className="text-muted-foreground">Ежедневные поставки свежих ингредиентов от проверенных поставщиков</p>
              </div>
              <div className="text-center p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="text-5xl mb-4">❤️</div>
                <h3 className="text-xl font-bold mb-2">С любовью</h3>
                <p className="text-muted-foreground">Каждую пиццу готовим с душой, как для своей семьи</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="promo" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Акции</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-8">
                <Badge className="mb-4 bg-primary">Горячее предложение!</Badge>
                <h3 className="text-2xl font-bold mb-2">2 пиццы = скидка 20%</h3>
                <p className="text-muted-foreground mb-4">При заказе двух любых пицц - скидка 20% на всю корзину</p>
                <Button onClick={() => scrollToSection('menu')}>
                  К меню
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
              <CardContent className="p-8">
                <Badge className="mb-4 bg-secondary">Новинка!</Badge>
                <h3 className="text-2xl font-bold mb-2">Бесплатная доставка</h3>
                <p className="text-muted-foreground mb-4">При заказе от 1500 рублей доставка по городу бесплатно!</p>
                <Button variant="secondary" onClick={() => scrollToSection('menu')}>
                  Заказать
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="delivery" className="py-20 bg-accent/20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Доставка</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-8">
                  <Icon name="Clock" size={40} className="text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Быстро</h3>
                  <p className="text-muted-foreground">Доставим вашу пиццу горячей за 30-40 минут по Курганинску</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-8">
                  <Icon name="MapPin" size={40} className="text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Везде</h3>
                  <p className="text-muted-foreground">Доставляем по всему городу и ближайшим районам</p>
                </CardContent>
              </Card>
            </div>
            <Card className="mt-8 bg-primary/5">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <Icon name="Info" size={32} className="text-primary flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Условия доставки</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Минимальный заказ: 500 рублей</li>
                      <li>• Стоимость доставки: 150 рублей</li>
                      <li>• Бесплатная доставка от 1500 рублей</li>
                      <li>• Время работы: 10:00 - 23:00 ежедневно</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Контакты</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <Icon name="Phone" size={24} className="text-primary mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Телефон</h3>
                    <a href="tel:+78612345678" className="text-primary text-lg hover:underline">
                      +7 (861) 234-56-78
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="MapPin" size={24} className="text-primary mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Адрес</h3>
                    <p className="text-muted-foreground">г. Курганинск, ул. Ленина, 123</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="Clock" size={24} className="text-primary mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Режим работы</h3>
                    <p className="text-muted-foreground">Ежедневно с 10:00 до 23:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Закажите прямо сейчас!</h3>
                <p className="text-muted-foreground mb-6">
                  Позвоните нам или оформите заказ онлайн. Мы уже начинаем готовить вашу пиццу!
                </p>
                <div className="space-y-3">
                  <Button size="lg" className="w-full text-lg">
                    <Icon name="Phone" size={20} className="mr-2" />
                    Позвонить
                  </Button>
                  <Button size="lg" variant="outline" className="w-full text-lg" onClick={() => scrollToSection('menu')}>
                    К меню
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-secondary text-secondary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="text-3xl">🍕</div>
              <span className="font-bold text-xl">ЖарПицца</span>
            </div>
            <p className="text-sm opacity-90">
              © 2024 ЖарПицца. Все права защищены.
            </p>
            <div className="flex gap-4">
              <p className="text-sm">г. Курганинск</p>
              <a href="tel:+78612345678" className="text-sm hover:underline">
                +7 (861) 234-56-78
              </a>
            </div>
          </div>
        </div>
      </footer>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default Index;