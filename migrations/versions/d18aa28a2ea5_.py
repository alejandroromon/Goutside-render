"""empty message

Revision ID: d18aa28a2ea5
Revises: 
Create Date: 2022-11-25 11:06:30.280452

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'd18aa28a2ea5'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('about_us',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('phone', sa.Integer(), nullable=False),
    sa.Column('contact_request', sa.String(length=3000), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('qualifier',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('media', sa.String(length=240), nullable=True),
    sa.Column('comment', sa.String(length=500), nullable=True),
    sa.Column('previous_result', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=40), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=True),
    sa.Column('last_name', sa.String(length=120), nullable=True),
    sa.Column('profile_image_url', sa.String(length=255), nullable=True),
    sa.Column('adress', sa.String(length=240), nullable=True),
    sa.Column('gender', sa.Enum('masculino', 'femenino', name='gender'), nullable=True),
    sa.Column('phone', sa.Integer(), nullable=True),
    sa.Column('rol', sa.Enum('competitor', 'administration', name='name'), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('competition',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('adminid', sa.Integer(), nullable=False),
    sa.Column('competition_name', sa.String(length=12), nullable=False),
    sa.Column('qualifier_date', sa.DateTime(), nullable=True),
    sa.Column('location', sa.String(length=240), nullable=False),
    sa.Column('category', postgresql.ARRAY(sa.Enum('rx_femenino', 'rx_masculino', 'scalled_femenino', 'scalled_masculino', 'elite_femenino', 'elite_masculino', 'equipos', name='category')), nullable=True),
    sa.Column('requirements', sa.String(length=500), nullable=False),
    sa.Column('description', sa.String(length=500), nullable=False),
    sa.Column('create_at', sa.DateTime(), nullable=True),
    sa.Column('poster_image_url', sa.String(length=255), nullable=True),
    sa.Column('stage', sa.Enum('inscripción_abierta', 'inscripción_cerrada', 'competición_finalizada', name='stages'), nullable=False),
    sa.ForeignKeyConstraint(['adminid'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('qualifier_competitor',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('qualifier_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['qualifier_id'], ['qualifier.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('competition_user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('competitor_id', sa.Integer(), nullable=False),
    sa.Column('competition_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['competition_id'], ['competition.id'], ),
    sa.ForeignKeyConstraint(['competitor_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('competition_user')
    op.drop_table('qualifier_competitor')
    op.drop_table('competition')
    op.drop_table('user')
    op.drop_table('qualifier')
    op.drop_table('about_us')
    # ### end Alembic commands ###
