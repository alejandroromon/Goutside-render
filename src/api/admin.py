
import os
from flask_admin import Admin
from .models import db, User, Competition, Competition_user, Qualifier_competitor, Qualifier, About_us
from flask_admin.contrib.sqla import ModelView


def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Competition, db.session))
    admin.add_view(ModelView(Competition_user, db.session))
    admin.add_view(ModelView(Qualifier_competitor, db.session))
    admin.add_view(ModelView(Qualifier, db.session))
    admin.add_view(ModelView(About_us, db.session))
